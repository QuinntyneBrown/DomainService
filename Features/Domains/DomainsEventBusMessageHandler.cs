using DomainService.Features.Core;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json.Linq;
using System;

namespace DomainService.Features.Domains
{
    public interface IDomainsEventBusMessageHandler: IEventBusMessageHandler { }

    public class DomainsEventBusMessageHandler: IDomainsEventBusMessageHandler
    {
        public DomainsEventBusMessageHandler(ICache cache)
        {
            _cache = cache;
        }

        public void Handle(JObject message)
        {
            try
            {
                if ($"{message["type"]}" == DomainsEventBusMessages.AddedOrUpdatedDomainMessage)
                {
                    _cache.Remove(DomainsCacheKeyFactory.Get(new Guid(message["tenantUniqueId"].ToString())));
                }

                if ($"{message["type"]}" == DomainsEventBusMessages.RemovedDomainMessage)
                {
                    _cache.Remove(DomainsCacheKeyFactory.Get(new Guid(message["tenantUniqueId"].ToString())));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private readonly ICache _cache;
    }
}
