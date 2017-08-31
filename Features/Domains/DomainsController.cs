using MediatR;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using DomainService.Features.Core;

namespace DomainService.Features.Domains
{
    [Authorize]
    [RoutePrefix("api/domains")]
    public class DomainController : BaseApiController
    {
        public DomainController(IMediator mediator)
            :base(mediator) { }

        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(AddOrUpdateDomainCommand.Response))]
        public async Task<IHttpActionResult> Add(AddOrUpdateDomainCommand.Request request) => Ok(await Send(request));

        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(AddOrUpdateDomainCommand.Response))]
        public async Task<IHttpActionResult> Update(AddOrUpdateDomainCommand.Request request) => Ok(await Send(request));
        
        [Route("get")]
        [AllowAnonymous]
        [HttpGet]
        [ResponseType(typeof(GetDomainsQuery.Response))]
        public async Task<IHttpActionResult> Get() => Ok(await Send(new GetDomainsQuery.Request()));

        [Route("getById")]
        [HttpGet]
        [ResponseType(typeof(GetDomainByIdQuery.Response))]
        public async Task<IHttpActionResult> GetById([FromUri]GetDomainByIdQuery.Request request) => Ok(await Send(request));

        [Route("remove")]
        [HttpDelete]
        [ResponseType(typeof(RemoveDomainCommand.Response))]
        public async Task<IHttpActionResult> Remove([FromUri]RemoveDomainCommand.Request request) => Ok(await Send(request));

    }
}
