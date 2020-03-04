using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPISample.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    MovieId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Director = table.Column<string>(nullable: true),
                    Genre = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movies", x => x.MovieId);
                });

            migrationBuilder.InsertData(
                table: "Movies",
                columns: new[] { "MovieId", "Director", "Genre", "ImageUrl", "Title" },
                values: new object[,]
                {
                    { 1, "Martin Scorsese", "Drama", null, "The Departed" },
                    { 2, "Christopher Nolan", "Drama", null, "The Dark Knight" },
                    { 3, "Christopher Nolan", "Drama", null, "Inception" },
                    { 4, "David Gordon Green", "Comedy", null, "Pineapple Express" },
                    { 5, "John McTiernan", "Action", null, "Die Hard" },
                    { 6, "Gus Van Sant", "Drama", "http://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/good_will_hed.jpg?itok=C57XTx1N", "Good WilL Hunting" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Movies");
        }
    }
}
