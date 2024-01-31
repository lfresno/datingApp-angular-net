namespace API.Errors
{
    public class ApiException
    {
        public ApiException(int statusCode, string msg, string details)
        {
            StatusCode = statusCode;
            Message = msg;
            Details = details;
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}