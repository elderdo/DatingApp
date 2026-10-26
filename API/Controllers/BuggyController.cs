namespace API.Controllers;

public class BuggyController : BaseApiController
{
    private readonly ILogger<BuggyController> _logger;

    public BuggyController(ILogger<BuggyController> logger)
    {
        _logger = logger;
    }

    [HttpGet("auth")]
    public IActionResult GetAuth()
    {
        // return a 401 Unauthorized for testing
        return Unauthorized();
    }

    [HttpGet("not-found")]
    public IActionResult GetNotFound()
    {
        // return a 404 Not found for testing
        return NotFound();
    }

    [HttpGet("server-error")]
    public IActionResult GetServerError()
    {
        // return Problem(title: "Internal Server Error", type: "Http REST API", statusCode: 500);
        throw new Exception("This is a server error");
    }

    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {
        // return a 400 Bad Request for testing
        return BadRequest("This was not a good request");
    }

}
