using AutoMapper;

namespace MedicRecord.Services.MedicalCenter.Dto
{
    internal class MedicalCenterMappingProfile: Profile
    {
        public MedicalCenterMappingProfile()
        {
            CreateMap<MedicalCenterDto, Domain.MedicalCenter>();
        }
    }
}
