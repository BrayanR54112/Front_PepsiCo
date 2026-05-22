export const eventBus = {
  emit: async (eventName, payload) => {
    console.log(`[EVENT BUS] 🔔 Evento emitido: ${eventName}`);
    console.log(`[EVENT BUS] 📦 Payload:`, JSON.stringify(payload, null, 2));
    
    // Simular procesamiento asíncrono
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`[EVENT BUS] ✅ Evento ${eventName} procesado con éxito.`);
  }
};
