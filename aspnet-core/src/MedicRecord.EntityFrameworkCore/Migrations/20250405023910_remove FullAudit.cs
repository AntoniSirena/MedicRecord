using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedicRecord.Migrations
{
    /// <inheritdoc />
    public partial class removeFullAudit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeleterUserId",
                table: "MedicalConsultSymptoms");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "MedicalConsultSymptoms");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "MedicalConsultSymptoms");

            migrationBuilder.DropColumn(
                name: "DeleterUserId",
                table: "medicalConsultDiseases");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "medicalConsultDiseases");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "medicalConsultDiseases");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "DeleterUserId",
                table: "MedicalConsultSymptoms",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "MedicalConsultSymptoms",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "MedicalConsultSymptoms",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "DeleterUserId",
                table: "medicalConsultDiseases",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "medicalConsultDiseases",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "medicalConsultDiseases",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
