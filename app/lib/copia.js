import { MercadoPagoConfig, Preference } from 'mercadopago'; // SDK de Mercado Pago

const client = new MercadoPagoConfig({ accessToken: 'TEST-5234027709903520-061010-315c94f4b8143d62476e38f884bf751b-139194673' }); 

app.post("/create_preference", async (req, res) => {
    try{
        const body ={
            items: [
                {
                    title: req.body.title,
                    unit_price: Number(req.body.price),
                    quantity: Number(req.body.quantity)
                },
            ],
            back_urls: {
                success: "http://localhost:3000/successPrueba", //MODIFICARRRR
                failure: "http://localhost:3000/failure",
                pending: "http://localhost:3000/pending"
            },
            auto_return: "approved",
        };
        const preference = new Preference(client);
        const result = await preference.create({body});
        res.json({
            id: result.body.id
        });
    }catch(error){
        console.log(error);
        res.status(500).send("Error al crear la preferencia");
    }
})

/**
 * Para invocar esto lo llama desde el front con:
 * const creatPreference = async () => {
 * try{ 
 *      const response = await fetch('http://localhost:3000/create_preference', {
 *      title: 'Album Musica',
 *      price: 10,
 *     quantity: 1
 *      });
 *     const {id} = response.data;
 *     return id;
 * }catch(error){
 *     console.log(error);
 * }
 * }
 */