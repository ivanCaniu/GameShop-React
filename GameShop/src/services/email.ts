import emailjs from '@emailjs/browser';

// Service ID and Template ID would normally come from environment variables
// For MVP we will define placeholders here or assume user provides them
const SERVICE_ID = 'service_gameshop_mvp';
const TEMPLATE_ID_PURCHASE = 'template_purchase_conf';
const PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';

export const sendPurchaseConfirmation = async (email: string, orderId: string, items: any[], total: number) => {
    try {
        const templateParams = {
            to_email: email,
            order_id: orderId,
            total_amount: total,
            items_list: items.map(item => `${item.title} (${item.type})`).join(', '),
            message: 'Gracias por tu compra. Si compraste keys digitales, las encontrarás en tu perfil.'
        };

        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID_PURCHASE, templateParams, PUBLIC_KEY);
        console.log('Email sent successfully!', response.status, response.text);
        return true;
    } catch (err) {
        console.error('Failed to send email:', err);
        return false;
    }
};
