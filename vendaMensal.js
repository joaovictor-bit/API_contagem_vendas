import mongoose from "mongoose";

const VendasMensalSchema = new mongoose.Schema ({
    mes: Number,
    valorVendido: Number,


});


export default mongoose.model('VendaMensal', VendasMensalSchema)