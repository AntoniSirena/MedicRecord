using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedicRecord.Migrations
{
    /// <inheritdoc />
    public partial class DatePatient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "MedicalCenterId",
                table: "Patients",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<DateTime>(
                name: "BirthDate",
                table: "Patients",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.CreateIndex(
                name: "IX_Patients_MedicalCenterId",
                table: "Patients",
                column: "MedicalCenterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_MedicalCenters_MedicalCenterId",
                table: "Patients",
                column: "MedicalCenterId",
                principalTable: "MedicalCenters",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_MedicalCenters_MedicalCenterId",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Patients_MedicalCenterId",
                table: "Patients");

            migrationBuilder.AlterColumn<int>(
                name: "MedicalCenterId",
                table: "Patients",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateOnly>(
                name: "BirthDate",
                table: "Patients",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }
    }
}
