using MedicRecord.Configuration.Dto;
using System.Threading.Tasks;

namespace MedicRecord.Configuration;

public interface IConfigurationAppService
{
    Task ChangeUiTheme(ChangeUiThemeInput input);
}
