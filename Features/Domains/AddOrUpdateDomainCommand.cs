using MediatR;
using DomainService.Data;
using DomainService.Model;
using DomainService.Features.Core;
using System;
using System.Threading.Tasks;
using System.Data.Entity;

namespace DomainService.Features.Domains
{
    public class AddOrUpdateDomainCommand
    {
        public class Request : BaseRequest, IRequest<Response>
        {
            public DomainApiModel Domain { get; set; }            
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
                var entity = await _context.Domains
                    .Include(x => x.Tenant)
                    .SingleOrDefaultAsync(x => x.Id == request.Domain.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                
                if (entity == null) {
                    var tenant = await _context.Tenants.SingleAsync(x => x.UniqueId == request.TenantUniqueId);
                    _context.Domains.Add(entity = new Domain() { TenantId = tenant.Id });
                }

                entity.Name = request.Domain.Name;

                entity.Description = request.Domain.Description;
                
                await _context.SaveChangesAsync();

                _bus.Publish(new AddedOrUpdatedDomainMessage(entity, request.CorrelationId, request.TenantUniqueId));

                return new Response();
            }

            private readonly DomainServiceContext _context;
            private readonly IEventBus _bus;
        }
    }
}
