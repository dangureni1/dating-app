namespace API.Errors
{
    public class ApiException
    {
        public int StatusCode { get; }
        public string Message { get; }
        public string Detail { get; }

        public ApiException(int statusCode, string message = null, string detail = null)
        {
            StatusCode = statusCode;
            Message = message;
            Detail = detail;
        }

        
    }
}