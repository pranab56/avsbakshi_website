type ApiError = {
  data?: {
    message?: string;
    errorMessages?: {
      path?: string;
      message: string;
    }[];
  };
};