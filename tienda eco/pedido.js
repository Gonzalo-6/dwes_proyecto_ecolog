const dayjs = require("dayjs");

// ===== CONSTANTES =====
const IVA = 0.21;
const fechaEntrega = dayjs().add(3, "day").format("YYYY/MM/DD");

// ===== DATOS DEL CLIENTE =====
let nombreCliente = "Juan Pérez";
let direccionEntrega = "Calle Falsa 123, Ciudad";
let telefonoContacto = "555-1234";
let subtotal = 110.00;
let stockDisponible = true;

// ===== PRODUCTOS =====
const productos = [
    {nombre: "Producto A", precio: 30.00, cantidad : 12},
    {nombre: "Producto B", precio: 20.00, cantidad : 21},
    {nombre: "Producto C", precio: 50.00, cantidad : 41},
    {nombre: "Producto D", precio: 45.00, cantidad : 35},
    {nombre: "Producto E", precio: 65.00, cantidad : 11},
]

// ===== NORMALIZACIÓN =====
const clienteNormalizado = nombreCliente.toUpperCase();
const direccionNormalizada = direccionEntrega.toUpperCase();
const telefonoNormalizado = telefonoContacto.replace(/-/g, "");

// ===== VALIDACIÓN FRÁGIL =====
const tieneFragil = productos.some(p => p.nombre.toLowerCase().includes("frágil"));

// ===== STOCK =====
function verificarStock(productos) {
    if(!stockDisponible) {
        console.log("❌ No hay stock disponible");
        return false;
    }
    return productos.every(producto => producto.cantidad > 0);
}

// ===== DESCUENTO =====
function obtenerDescuento(subtotal) {
    return subtotal >= 100 ? 0.05 : 0;
}

// ===== TOTAL =====
function calcularTotal(subtotal, descuentoPct) {
    const descuento = subtotal * descuentoPct;
    const subtotalConDescuento = subtotal - descuento;
    const ivaCalculado = subtotalConDescuento * IVA;
    const total = subtotalConDescuento + ivaCalculado;

    return {descuento, subtotalConDescuento, ivaCalculado, total};
}

// ===== PROCESAMIENTO =====
if (verificarStock(productos)) {

    const descuentoPct = obtenerDescuento(subtotal);
    const {descuento, subtotalConDescuento, ivaCalculado, total} = calcularTotal(subtotal, descuentoPct);

    const resumenPedido = `
=========================================
🌱 TIENDA ECO - RESUMEN DEL PEDIDO 🌱
=========================================
👤 Cliente: ${clienteNormalizado}
📦 Productos: ${productos.map(p => p.nombre).join(", ")}
⚠️ ¿Contiene frágiles?: ${tieneFragil ? "Sí" : "No"}

--- Facturación ---
Subtotal inicial: ${subtotal.toFixed(2)}€
Descuento aplicado: ${(descuentoPct*100)}%
Subtotal tras descuento: ${subtotalConDescuento.toFixed(2)}€
IVA: ${ivaCalculado.toFixed(2)}€
-----------------------------------------
💶 TOTAL: ${total.toFixed(2)}€
🚚 Entrega: ${fechaEntrega}
=========================================
`;

    console.log(resumenPedido);
}