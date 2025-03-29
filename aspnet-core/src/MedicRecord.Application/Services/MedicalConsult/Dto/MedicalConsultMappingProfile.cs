using AutoMapper;
using MedicRecord.Services.MedicalCenter.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicRecord.Services.MedicalConsult.Dto
{
    internal class MedicalConsultMappingProfile : Profile
    {
       public MedicalConsultMappingProfile()
        {
            CreateMap<MedicalConsultDto, Domain.MedicalConsult>();
        }
    }
}
