import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, price, image } = await req.json();

    if (!name || !price || !image) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const newProduct = new Product({ name, price, image });
    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al crear el producto", error }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json(
      { message: "Error al obtener productos", error: error.message },
      { status: 500 }
    );
  }
}

