using Abp.Modules;
using Abp.Reflection.Extensions;
using MedicRecord.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace MedicRecord.Web.Host.Startup
{
    [DependsOn(
       typeof(MedicRecordWebCoreModule))]
    public class MedicRecordWebHostModule : AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public MedicRecordWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(MedicRecordWebHostModule).GetAssembly());
        }
    }
}
