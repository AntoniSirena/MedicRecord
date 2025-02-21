using AutoMapper;
using MedicRecord.Services.Disease.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicRecord.Services.Patient.Dto
{
    internal class PatientMappingProfile : Profile
    {
        public PatientMappingProfile()
        {
            CreateMap<PatientDto, Domain.Patient>();
        }
    }
}
