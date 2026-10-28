"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Send,
  Trash2,
  Loader2,
  RefreshCw,
  X,
  Image as LucideImage,
  MessageSquare,
  Ban,
} from "lucide-react";
import { toast } from "sonner";
import { useGetAllChatsQuery, useDeleteChatMutation } from "@/features/chat/chatApi";
import { useGetMyMessageQuery, useSendMessageMutation, useDeleteMessageMutation } from "@/features/message/messageApi";
import { useUploadMutation } from "@/features/upload/uploadApi";
import { useGetMyProfileQuery } from "@/features/profile/profileApi";
import { getSocket } from "@/utils/socket";

function CustomerMessagesContent() {
  const searchParams = useSearchParams();
  const chatIdParam = searchParams.get("chatId");

  const [selectedChatId, setSelectedChatId] = useState<string | null>(chatIdParam || null);
  const [newMessageText, setNewMessageText] = useState("");
  const [deleteModalChat, setDeleteModalChat] = useState<{ id: string; name: string } | null>(null);

  // Message deletion & Image attachment state
  const [deleteMessageId, setDeleteMessageId] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // RTK Queries & Mutations
  const { data: profileResponse } = useGetMyProfileQuery(undefined);
  const myProfileId = profileResponse?.data?._id;

  const { data: chatsResponse, isLoading: isChatsLoading, isError: isChatsError, refetch: refetchChats, isFetching: isFetchingChats } = useGetAllChatsQuery(undefined);
  const [deleteChat, { isLoading: isDeletingChat }] = useDeleteChatMutation();
  const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();
  const [deleteMessage, { isLoading: isDeletingMessage }] = useDeleteMessageMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadMutation();

  const chats = chatsResponse?.data || [];

  // Sync selectedChatId with query param
  useEffect(() => {
    if (chatIdParam) {
      if (chats.length > 0) {
        const directChat = chats.find((c: any) => c._id === chatIdParam);
        if (directChat) {
          setSelectedChatId(directChat._id);
        } else {
          const participantChat = chats.find((c: any) =>
            Array.isArray(c.participants) &&
            c.participants.some((p: any) => p._id === chatIdParam || p.id === chatIdParam)
          );
          if (participantChat) {
            setSelectedChatId(participantChat._id);
          } else {
            setSelectedChatId(chatIdParam);
          }
        }
      } else {
        setSelectedChatId(chatIdParam);
      }
    }
  }, [chatIdParam, chats]);

  // Fetch messages for selected chat
  const { data: messagesResponse, isLoading: isMessagesLoading, refetch: refetchMessages } = useGetMyMessageQuery(
    selectedChatId,
    { skip: !selectedChatId }
  );

  const rawMessageList = messagesResponse?.data || messagesResponse || [];

  // Sort messages chronologically (oldest at top, newest at bottom)
  const messageList = Array.isArray(rawMessageList)
    ? [...rawMessageList].sort((a: any, b: any) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime())
    : [];

  // 1. Global Socket Listeners for chat list updates & errors
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleChatList = (data?: any) => {
      console.log("Realtime socket getChatList received:", data);
      refetchChats();
    };

    const handleErrorMessage = (err?: any) => {
      console.error("Realtime socket errorMessage received:", err);
    };

    socket.on("getChatList", handleChatList);
    socket.on("errorMessage", handleErrorMessage);

    return () => {
      socket.off("getChatList", handleChatList);
      socket.off("errorMessage", handleErrorMessage);
    };
  }, [refetchChats]);

  // 2. Chat Room Connection & Message Listener (getMessage)
  useEffect(() => {
    if (!selectedChatId) return;

    const socket = getSocket();
    if (!socket) return;

    const joinRoom = () => {
      console.log("Emitting room:join with chatId:", selectedChatId);
      socket.emit("room:join", { chatId: selectedChatId });
    };

    if (socket.connected) {
      joinRoom();
    } else {
      socket.once("connect", joinRoom);
      socket.connect();
    }

    const handleIncomingMessage = (data?: any) => {
      console.log("Realtime socket getMessage received:", data);
      refetchMessages();
      refetchChats();
    };

    // Primary event according to Postman docs: getMessage
    socket.on("getMessage", handleIncomingMessage);
    socket.on("getChatList", handleIncomingMessage);
    socket.on("get-message", handleIncomingMessage);
    socket.on("new-message", handleIncomingMessage);
    socket.on("message", handleIncomingMessage);
    socket.on("room:message", handleIncomingMessage);

    return () => {
      console.log("Emitting room:leave with chatId:", selectedChatId);
      socket.emit("room:leave", { chatId: selectedChatId });

      socket.off("getMessage", handleIncomingMessage);
      socket.off("getChatList", handleIncomingMessage);
      socket.off("get-message", handleIncomingMessage);
      socket.off("new-message", handleIncomingMessage);
      socket.off("message", handleIncomingMessage);
      socket.off("room:message", handleIncomingMessage);
      socket.off("connect", joinRoom);
    };
  }, [selectedChatId, refetchMessages, refetchChats]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList.length, selectedChatId]);

  // Helper to extract professional details from chat participants
  const getParticipantInfo = (chat: any) => {
    if (!chat || !chat.participants || !Array.isArray(chat.participants) || chat.participants.length === 0) {
      return {
        id: chat?._id,
        name: "Professional",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        isOnline: false,
      };
    }

    const proParticipant = myProfileId
      ? chat.participants.find((p: any) => p._id !== myProfileId) || chat.participants[0]
      : chat.participants[0];

    const p = proParticipant || chat.participants[0];
    const name = `${p.firstName || ""} ${p.lastName || ""}`.trim() || p.email || "Professional";
    const avatar = p.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";

    return {
      id: p._id,
      name,
      avatar,
      isOnline: !!p.isOnline,
    };
  };

  const getLastMessageText = (chat: any) => {
    if (!chat.lastMessage) return "No messages yet";
    if (typeof chat.lastMessage === "string") return chat.lastMessage;
    return chat.lastMessage.text || chat.lastMessage.content || "No messages yet";
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  // Image Selection Handlers
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    setSelectedImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const clearSelectedImage = () => {
    setSelectedImageFile(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const activeChat =
    chats.find((c: any) => c._id === selectedChatId) ||
    chats.find((c: any) =>
      Array.isArray(c.participants) &&
      c.participants.some((p: any) => p._id === selectedChatId || p.id === selectedChatId)
    ) ||
    (selectedChatId ? { _id: selectedChatId } : null);
  const activeParticipant = activeChat ? getParticipantInfo(activeChat) : null;

  // Send Message logic
  const handleSendMessage = async () => {
    if ((!newMessageText.trim() && !selectedImageFile) || !selectedChatId) return;

    const textToSend = newMessageText.trim();
    const imageFile = selectedImageFile;

    // Reset inputs
    setNewMessageText("");
    clearSelectedImage();

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("file", imageFile);

        toast.info("Uploading image...");
        const uploadRes = await uploadImage(formData).unwrap();
        const uploadedUrl = uploadRes?.data?.url || uploadRes?.data || uploadRes?.url || uploadRes?.image;

        if (!uploadedUrl) {
          throw new Error("Failed to upload image.");
        }

        const sentRes = await sendMessage({
          chat: selectedChatId,
          type: "image",
          content: uploadedUrl,
        }).unwrap();

        toast.success("Image sent!");

        refetchMessages();
        refetchChats();

        const socket = getSocket();
        if (socket) {
          const payload = {
            chatId: selectedChatId,
            chat: selectedChatId,
            content: uploadedUrl,
            type: "image",
            message: sentRes?.data || sentRes,
          };
          socket.emit("send-message", payload);
          socket.emit("new-message", payload);
          socket.emit("room:message", payload);
          socket.emit("message", payload);
        }
      } else {
        const sentRes = await sendMessage({
          chat: selectedChatId,
          type: "text",
          content: textToSend,
        }).unwrap();

        refetchMessages();
        refetchChats();

        const socket = getSocket();
        if (socket) {
          const payload = {
            chatId: selectedChatId,
            chat: selectedChatId,
            content: textToSend,
            type: "text",
            message: sentRes?.data || sentRes,
          };
          socket.emit("send-message", payload);
          socket.emit("new-message", payload);
          socket.emit("room:message", payload);
          socket.emit("message", payload);
        }
      }
    } catch (err: any) {
      console.error("Failed to send message:", err);
      toast.error(err?.data?.message || err?.message || "Failed to send message.");
    }
  };

  const handleDeleteChat = async () => {
    if (!deleteModalChat) return;

    try {
      await deleteChat(deleteModalChat.id).unwrap();
      toast.success("Chat deleted successfully!");
      if (selectedChatId === deleteModalChat.id) {
        setSelectedChatId(null);
      }
      setDeleteModalChat(null);
    } catch (err: any) {
      console.error("Failed to delete chat:", err);
      toast.error(err?.data?.message || "Failed to delete chat.");
    }
  };

  const handleConfirmDeleteMessage = async () => {
    if (!deleteMessageId) return;

    try {
      await deleteMessage(deleteMessageId).unwrap();
      toast.success("Message deleted!");
      setDeleteMessageId(null);
    } catch (err: any) {
      console.error("Failed to delete message:", err);
      toast.error(err?.data?.message || "Failed to delete message.");
    }
  };

  return (
    <div className="space-y-6">
      {/* ----------------------------------------------------------------- */}
      {/* VIEW 1: CONVERSATIONS LIST (When no conversation is selected)     */}
      {/* ----------------------------------------------------------------- */}
      {!selectedChatId && (
        <div className="space-y-6">
          {/* Header Title & Refresh */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
                Messages
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
                Your conversations with salon professionals
              </p>
            </div>
            <button
              type="button"
              onClick={() => refetchChats()}
              disabled={isFetchingChats}
              className="p-2 rounded-lg border border-border bg-card hover:bg-accent text-xs font-semibold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh Chats"
            >
              <RefreshCw className={`w-4 h-4 ${isFetchingChats ? "animate-spin" : ""}`} />
            </button>
          </div>

          {/* Conversations List Container */}
          <div className="bg-card border border-border rounded-xl overflow-hidden divide-y divide-border shadow-xs">
            {isChatsLoading ? (
              <div className="divide-y divide-border/60">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="p-4 sm:p-5 flex items-center gap-4 animate-pulse"
                  >
                    <div className="w-12 h-12 rounded-full bg-muted/70 dark:bg-zinc-800/70 shrink-0" />
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="h-4 bg-muted/70 dark:bg-zinc-800/70 rounded w-32" />
                        <div className="h-3 bg-muted/50 dark:bg-zinc-800/50 rounded w-14" />
                      </div>
                      <div className="h-3 bg-muted/50 dark:bg-zinc-800/50 rounded w-48" />
                    </div>
                  </div>
                ))}
              </div>
            ) : isChatsError ? (
              <div className="p-8 text-center text-xs text-destructive">
                Failed to load conversations.
              </div>
            ) : chats.length > 0 ? (
              chats.map((chat: any) => {
                const participant = getParticipantInfo(chat);
                const lastMsg = getLastMessageText(chat);
                const formattedTime = formatDate(chat.updatedAt);

                return (
                  <div
                    key={chat._id}
                    onClick={() => setSelectedChatId(chat._id)}
                    className="group p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-accent border border-border">
                          <Image
                            src={participant.avatar}
                            alt={participant.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        {chat.unreadCount && chat.unreadCount > 0 ? (
                          <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-background">
                            {chat.unreadCount}
                          </span>
                        ) : null}
                      </div>

                      {/* Name & Preview Text */}
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <h3 className="font-bold text-base text-foreground truncate">
                          {participant.name}
                        </h3>
                        <p className="text-xs sm:text-sm leading-tight text-muted-foreground truncate">
                          {lastMsg}
                        </p>
                      </div>
                    </div>

                    {/* Timestamp & Delete Action */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {formattedTime}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteModalChat({ id: chat._id, name: participant.name });
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all cursor-pointer"
                        title="Delete Chat"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center text-xs text-muted-foreground italic">
                No conversations found.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* VIEW 2: CHAT CONVERSATION VIEW (When a conversation is selected)  */}
      {/* ----------------------------------------------------------------- */}
      {selectedChatId && activeParticipant && (
        <div className="space-y-4">
          {/* Top Bar with Back Button & Selected Professional Info */}
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedChatId(null)}
                className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex items-center gap-3 ml-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-accent border border-border">
                  <Image
                    src={activeParticipant.avatar}
                    alt={activeParticipant.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold text-base sm:text-lg text-foreground leading-tight">
                    {activeParticipant.name}
                  </h2>
                  {activeParticipant.isOnline ? (
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                      Online
                    </span>
                  ) : (
                    <span className="text-[11px] text-muted-foreground">Offline</span>
                  )}
                </div>
              </div>
            </div>

            {/* Header Delete Action */}
            <button
              type="button"
              onClick={() => setDeleteModalChat({ id: selectedChatId, name: activeParticipant.name })}
              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
              title="Delete Conversation"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>

          {/* Main Messages Thread Box */}
          <div className="bg-card border h-[calc(100vh-220px)] min-h-[500px] border-border rounded-2xl p-4 sm:p-6 flex flex-col justify-between gap-4 shadow-xs">
            {/* Scrollable Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {isMessagesLoading ? (
                <div className="p-12 text-center flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <span className="text-xs text-muted-foreground">Loading messages...</span>
                </div>
              ) : messageList.length > 0 ? (
                messageList.map((msg: any, idx: number) => {
                  const senderId = typeof msg.sender === "object" ? msg.sender?._id : msg.sender;
                  const isMyMessage = myProfileId
                    ? senderId === myProfileId
                    : (msg.isMyMessage ?? (msg.sender === "user" || msg.role === "customer"));

                  const msgType = msg.type || (msg.content?.startsWith("http") ? "image" : "text");
                  const timeStr = formatDate(msg.createdAt);

                  return (
                    <div
                      key={msg._id || idx}
                      className={`group/msg flex flex-col ${isMyMessage ? "items-end" : "items-start"
                        }`}
                    >
                      <div className="relative max-w-xs sm:max-w-md flex items-center gap-1.5">
                        {/* Delete Message Action Button */}
                        {isMyMessage && !msg.isDeleted && (
                          <button
                            type="button"
                            onClick={() => setDeleteMessageId(msg._id)}
                            className="opacity-0 group-hover/msg:opacity-100 p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-all cursor-pointer shrink-0"
                            title="Delete Message"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Message Content Bubble */}
                        {msg.isDeleted ? (
                          <div className="p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed bg-accent/40 text-muted-foreground border border-border italic flex items-center gap-1.5">
                            <Ban className="w-3.5 h-3.5 shrink-0 opacity-70" />
                            <span>Message deleted</span>
                          </div>
                        ) : (
                          <div
                            className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${isMyMessage
                              ? "bg-primary text-primary-foreground rounded-br-xs shadow-xs"
                              : "bg-accent text-foreground rounded-bl-xs border border-border"
                              }`}
                          >
                            {msgType === "image" ? (
                              <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-xl overflow-hidden bg-black/10 border border-white/20">
                                <Image
                                  src={msg.content}
                                  alt="Shared Attachment"
                                  fill
                                  className="object-cover cursor-pointer hover:scale-105 transition-transform"
                                  unoptimized
                                  onClick={() => window.open(msg.content, "_blank")}
                                />
                              </div>
                            ) : (
                              <span>{msg.content || msg.text || ""}</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Time & Read Status */}
                      {timeStr && (
                        <span className="text-[11px] text-muted-foreground mt-1 px-1 flex items-center gap-1">
                          {timeStr}
                          {msg.isSeen && isMyMessage && <span className="text-primary font-bold">✓✓</span>}
                        </span>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center text-xs text-muted-foreground italic">
                  No messages yet. Send a message to start the conversation!
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Selected Image Attachment Preview Bar */}
            {imagePreviewUrl && (
              <div className="px-4 py-2 bg-accent/60 border border-border rounded-xl flex items-center justify-between animate-in fade-in duration-150">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border bg-muted">
                    <Image src={imagePreviewUrl} alt="Attachment Preview" fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground truncate max-w-[180px]">
                      {selectedImageFile?.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Ready to send as image</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearSelectedImage}
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-card rounded-md transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Input Bar at Bottom */}
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingImage || isSendingMessage}
                className="p-3 text-muted-foreground hover:text-foreground hover:bg-accent border border-border rounded-xl transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                title="Attach Image"
              >
                <LucideImage className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={selectedImageFile ? "Press Send to upload image..." : "Type a message..."}
                className="flex-1 bg-accent border border-border rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary"
              />

              <button
                type="button"
                onClick={handleSendMessage}
                disabled={isSendingMessage || isUploadingImage || (!newMessageText.trim() && !selectedImageFile)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 disabled:opacity-50 shadow-sm"
              >
                {isSendingMessage || isUploadingImage ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CHAT CONFIRMATION MODAL */}
      {deleteModalChat && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-destructive">
              <div className="p-2.5 rounded-full bg-destructive/10">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-foreground">
                Delete Conversation?
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to delete your conversation with{" "}
              <span className="font-semibold text-foreground">{deleteModalChat.name}</span>?
              This action cannot be undone and will permanently remove this chat.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setDeleteModalChat(null)}
                disabled={isDeletingChat}
                className="px-4 py-2 rounded-xl border border-border bg-card hover:bg-accent text-xs font-semibold text-foreground transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteChat}
                disabled={isDeletingChat}
                className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
              >
                {isDeletingChat ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                <span>Delete Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SMALL MESSAGE DELETE CONFIRMATION MODAL */}
      {deleteMessageId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-card border border-border rounded-2xl w-full max-w-xs p-5 space-y-3 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-center">
            <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive mx-auto flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-foreground">Delete Message?</h4>
              <p className="text-xs text-muted-foreground">
                Are you sure you want to remove this message?
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setDeleteMessageId(null)}
                disabled={isDeletingMessage}
                className="flex-1 py-2 rounded-xl border border-border bg-card hover:bg-accent text-xs font-semibold text-foreground transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteMessage}
                disabled={isDeletingMessage}
                className="flex-1 py-2 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
              >
                {isDeletingMessage ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CustomerMessagesPage() {
  return (
    <Suspense fallback={
      <div className="p-12 text-center flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="text-xs text-muted-foreground">Loading messages...</span>
      </div>
    }>
      <CustomerMessagesContent />
    </Suspense>
  );
}