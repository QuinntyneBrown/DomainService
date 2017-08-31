using MediatR;
using DomainService.Data;
using DomainService.Model;
using DomainService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace DomainService.Features.Domains
{
    public class RemoveDomainCommand
    {
        public class Request : BaseRequest, IRequest<Response>
        {
            public int Id { get; set; }
            public Guid CorrelationId { get; set; }
        }

        public class Response { }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(DomainServiceContext context, IEventBus bus)
            {
                _context = context;
                _bus = bus;
            }

            public async Task<Response> Handle(Request request)
            {
                var domain = await _context.Domains.SingleAsync(x=>x.Id == request.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                domain.IsDeleted = true;
                await _context.SaveChangesAsync();
                _bus.Publish(new RemovedDomainMessage(request.Id, request.CorrelationId, request.TenantUniqueId));
                return new Response();
            }

            private readonly DomainServiceContext _context;
            private readonly IEventBus _bus;
        }
    }
}
