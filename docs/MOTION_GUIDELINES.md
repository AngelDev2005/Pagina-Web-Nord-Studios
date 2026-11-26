# Movimiento

> Documento histórico de la implementación anterior. Consulta el [traspaso vigente](HANDOFF.md), la [guía de portafolio](PORTFOLIO_GUIDE.md) y las [mediciones de fase 1](PHASE_1_QA.md).
El H1 está visible desde el primer render. Un haz de luz naranja se desplaza mediante transform y opacidad durante 4,8 segundos. El fondo permanece estático al acabar.
Los enlaces responden en 180–200 ms. Las portadas de casos amplían la imagen hasta 1.025 en 350 ms, dentro de un marco que mantiene sus dimensiones. El menú móvil usa el elemento details nativo con una entrada breve. FAQs, anclas y navegación conservan la interacción del navegador.
Los tokens de duración y curvas se encuentran en globals.css. Con prefers-reduced-motion se desactivan animaciones, transiciones y desplazamiento suave. Se eligió CSS por el alcance de las interacciones y para reducir JavaScript inicial.
Las etapas y la imagen del estudio usan una animación vinculada a la entrada en pantalla en los navegadores compatibles. El recorrido máximo es de 12 px. El contenido conserva su posición final en navegadores sin soporte.
