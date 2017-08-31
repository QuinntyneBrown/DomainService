using MediatR;
using DomainService.Data;
using DomainService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace DomainService.Features.Domains
{
    public class GetDomainsQuery
    {
        public class Request : BaseRequest, IRequest<Response> { }

        public class Response
        {
            public ICollection<DomainApiModel> Domains { get; set; } = new HashSet<DomainApiModel>();
        }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(DomainServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<Response> Handle(Request request)
            {
                var domains = await _context.Domains
                    .Include(x => x.Tenant)
                    .Where(x => x.Tenant.UniqueId == request.TenantUniqueId )
                    .ToListAsync();

                return new Response()
                {
                    Domains = domains.Select(x => DomainApiModel.FromDomain(x)).ToList()
                };
            }

            private readonly DomainServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
