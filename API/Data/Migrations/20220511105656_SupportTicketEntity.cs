using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class SupportTicketEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {


            migrationBuilder.CreateTable(
                name: "SupportTickets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Urgency = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Problem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TicketDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupportTickets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SupportTicketReplies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Reply = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReplyDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SupportTicketId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupportTicketReplies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupportTicketReplies_SupportTickets_SupportTicketId",
                        column: x => x.SupportTicketId,
                        principalTable: "SupportTickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "4dc9829d-149a-40f2-89a3-a42215048448");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "2ef0f24f-3112-4c4d-8fbb-32e64576ab4b");

            migrationBuilder.CreateIndex(
                name: "IX_SupportTicketReplies_SupportTicketId",
                table: "SupportTicketReplies",
                column: "SupportTicketId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropTable(
                name: "SupportTicketReplies");

            migrationBuilder.DropTable(
                name: "SupportTickets");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "bb430983-f478-4f4d-9c30-45addfaba8a3");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "e9163b56-5331-464d-8ea7-44d984b59659");
        }
    }
}
