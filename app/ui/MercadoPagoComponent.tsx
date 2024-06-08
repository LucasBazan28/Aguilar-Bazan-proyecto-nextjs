import React, { useEffect } from 'react';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

const Home: React.FC = () => {
  useEffect(() => {
    initMercadoPago('TEST-f9691887-90f2-4973-8dc8-80964b823e7d');
  }, []);

  const initialization = {
    amount: 100,
    preferenceId: '<PREFERENCE_ID>',
  };

  const customization = {
    paymentMethods: {
      ticket: 'all',
      creditCard: 'all',
      debitCard: 'all',
      mercadoPago: 'all',
    },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }: any) => {
    return new Promise<void>((resolve, reject) => {
      fetch('/api/process_payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(response => {
          resolve();
        })
        .catch(error => {
          reject();
        });
    });
  };

  const onError = async (error: any) => {
    console.error(error);
  };

  const onReady = async () => {
    console.log('Brick is ready');
  };

  let preference = {
    // el "purpose": "wallet_purchase" solo permite pagos registrados
    // para permitir pagos de guests puede omitir esta propiedad
    "purpose": "wallet_purchase",
    "items": [
      {
        "id": "item-ID-1234",
        "title": "Meu produto",
        "quantity": 1,
        "unit_price": 75.76
      }
    ]
  };
  
  mercadopago.preferences.create(preference)
    .then(function (response) {
      // Este valor es el ID de preferencia que se enviará al ladrillo al inicio
      const preferenceId = response.body.id;
    }).catch(function (error) {
      console.log(error);
    });

  return (
    <div>
      <h1>Mercado Pago Integration</h1>
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </div>
  );
};

export default Home;