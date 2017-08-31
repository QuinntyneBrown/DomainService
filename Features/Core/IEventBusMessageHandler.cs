using Newtonsoft.Json.Linq;

namespace DomainService.Features.Core
{
    public interface IEventBusMessageHandler
    {
        void Handle(JObject message);
    }
}