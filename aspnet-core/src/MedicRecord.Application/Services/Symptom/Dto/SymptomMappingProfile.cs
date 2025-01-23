using AutoMapper;
using MedicRecord.Services.MedicalCenter.Dto;
using System;

namespace MedicRecord.Services.Symptom.Dto
{
    internal class SymptomMappingProfile : Profile
    {
        public SymptomMappingProfile()
        {
            CreateMap<SymptomDto, Domain.Symptom>();
        }
    }
}
