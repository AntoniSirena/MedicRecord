using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using MedicRecord.Domain;
using MedicRecord.Services.CommonComboBox.Dto;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace MedicRecord.Services.CommonComboBox
{
    public class CommonComboBoxAppService : MedicRecordAppServiceBase, ICommonComboBoxAppService
    {
        private readonly IAbpSession _session;
        private readonly IRepository<BloodType> bloodTypeRepository;
        private readonly IRepository<Domain.MedicalCenter> medicalCenterRepository;

        public CommonComboBoxAppService(IAbpSession session, IRepository<BloodType> _bloodTypeRepository, IRepository<Domain.MedicalCenter> _medicalCenterRepository)
        {
            _session = session;
            bloodTypeRepository = _bloodTypeRepository;
            medicalCenterRepository = _medicalCenterRepository;
        }

        [HttpPost]
        public async Task<CommonComboBoxOutputDto> GetComboBoxes()
        {
            CommonComboBoxOutputDto output = new CommonComboBoxOutputDto();

            var bloodTypes = bloodTypeRepository.GetAll().Where(x => x.IsDeleted == false).OrderBy(t => t.Name);
            var medicalCenters = medicalCenterRepository.GetAll().Where(x => x.IsDeleted == false).OrderBy(t => t.Name);

            output.BloodTypes = bloodTypes.Select(x => new ComboboxItemDto { Id = x.Id, DisplayText = x.Name }).ToList();
            output.MedicalCenters = medicalCenters.Select(x => new ComboboxItemDto { Id = x.Id, DisplayText = x.Name }).ToList();

            return await Task.Run(() => output);
        }

    }
}
