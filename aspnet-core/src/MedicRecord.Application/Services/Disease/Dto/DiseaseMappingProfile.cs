using AutoMapper;
using MedicRecord.Services.Symptom.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicRecord.Services.Disease.Dto
{
    internal class DiseaseMappingProfile : Profile
    {
        public DiseaseMappingProfile()
        {
            CreateMap<DiseaseDto, Domain.Disease>();
        }
    }
}
