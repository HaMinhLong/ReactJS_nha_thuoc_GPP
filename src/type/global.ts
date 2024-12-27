export type ErrorResponse = {
  error: {
    data: {
      error: {
        message: string;
        error: string;
        status: number;
      };
      statusCode: number;
      timestamp: string;
    };
    status: number;
  };
};
