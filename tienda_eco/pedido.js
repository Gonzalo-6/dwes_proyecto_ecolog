// Importar librería
const dayjs = require("dayjs");

// ===== CONSTANTES =====
const IVA = 0.21;
let fechaEntrega = dayjs().add(3, "day").format("YYYY/MM/DD");
let porcentajeDescuento = 0;


// ===== DATOS DEL CLIENTE =====
let nombreCliente = "Juan Pérez";
let direccionEntrega = "Calle Falsa 123, Ciudad";
let telefonoContacto = "555-1234";
let subtotal = 110.00;
let stockDisponible = true;

// ===== PRODUCTOS PEDIDOS =====
const productos = [
    {nombre: "Producto A", precio: 30.00, cantidad : 12},
    {nombre: "Producto B", precio: 20.00, cantidad : 21},
    {nombre: "Producto C", precio: 50.00, cantidad : 41},
    {nombre: "Producto D", precio: 45.00, cantidad : 35},
    {nombre: "Producto E", precio: 65.00, cantidad : 11},
]

// ===== NORMALIZACIÓN =====
let clienteNormalizado = nombreCliente.toUpperCase();
let direccionNormalizada = direccionEntrega.toUpperCase();
let telefonoNormalizado = telefonoContacto.replace(/-/g, "");

// ===== VALIDACIONES =====node pedidso
let tieneFragil = productos.includes(productos => productos.nombre.toLowerCase().includes("frágil"));


// ===== VALIDADCIÓN STOCK =====

function verificarStock(productos) {
    if(!stockDisponible) {
        console.log("❌ No hay stock disponible para procesar el pedido");
        return false;
    }
    return productos.every(producto => producto.cantidad > 0);
}

// ===== DESCUENTO =====
function porcentajeDescuento(subtotal) {
    if (subtotal >= 100)
        return porcentajeDescuento = 0.05;
    else {
        return porcentajeDescuento = 0;
    }
}

// ===== CÁLCULO TOTAL =====

function calcularTotal(subtotal, porcentajeDescuento) {
    let descuento = subtotal * porcentajeDescuento;
    let totalConDescuento = subtotal - descuento;
    let totalFinal = totalConDescuento * (1 + IVA);
    return totalFinal.toFixed(2);

}


// ===== FECHA ENTREGA =====

function entregarPedido(){
    if (verificarStock(productos)) {
        const descuentoAplicado = porcentajeDescuento(subtotal);
        const total = calcularTotal(subtotal, descuentoAplicado);
        console.log (`Pedido entregado a ${clienteNormalizado} en ${direccionNormalizada}. Total a pagar: ${total} €. Fecha estimada de entrega: ${fechaEntrega}`);
    }
}


const resumenPedido = `
=========================================
🌱 TIENDA ECO - RESUMEN DEL PEDIDO 🌱
=========================================
👤 Cliente: ${clienteNormalizado}
📦 Productos: ${productos.join(", ")}
⚠️ ¿Contiene frágiles?: ${tieneFragil ? "Sí (Se requiere embalaje especial)" : "No"}

--- Desglose de Facturación ---
Subtotal inicial: ${subtotal.toFixed(2)}€
Descuento aplicado: ${porcentajeDescuento * 100}%
Subtotal tras descuento: ${subtotalConDescuento.toFixed(2)}€
Impuestos (IVA 21%): ${(subtotalConDescuento * IVA).toFixed(2)}€
-----------------------------------------
💶 TOTAL A PAGAR: ${total.toFixed(2)}€
=========================================
🚚 Fecha estimada de entrega: ${fechaEntrega}
=========================================
`;

console.log(resumenPedido);