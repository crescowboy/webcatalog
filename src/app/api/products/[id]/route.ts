import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = await params; 

    if (!id) {
      return NextResponse.json({ message: "ID del producto requerido" }, { status: 400 });
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener el producto", error }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "ID del producto requerido" }, { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Producto eliminado exitosamente" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al eliminar el producto", error }, { status: 500 });
  }
}
