import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData(); 
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const image = formData.get("image") as File | null;

    if (!name || !price || !image) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imagePath = path.join(process.cwd(), "public/uploads", image.name);
    await writeFile(imagePath, buffer);

    const newProduct = new Product({
      name,
      price,
      image: `/uploads/${image.name}` 
    });

    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    console.error("Error al crear el producto:", error);
    return NextResponse.json(
      { message: "Error al crear el producto", error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error: unknown) {
    console.error("Error al obtener los productos:", error);
    return NextResponse.json(
      { message: "Error al obtener los productos", error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
}
