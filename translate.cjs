const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const translations = {
  'label="Funciones"': 'label="Features"',
  'label="Soporte"': 'label="Support"',
  'label="Comprar"': 'label="Buy"',
  'label="Descargar"': 'label="Download"',
  'NauticPlayer combina la máxima eficiencia nativa de Apple con un algoritmo Automix de grado DJ. Disfruta de tu colección de audio Lossless con transiciones perfectas y sin drenar la batería de tu Mac.': "NauticPlayer combines ultimate Apple native efficiency with a DJ-grade Automix algorithm. Enjoy your Lossless audio collection with seamless transitions without draining your Mac's battery.",
  'Mezcla Automática y DJ Mode': 'Automix and DJ Mode',
  'Olvídate del "zapateo" y los molestos choques de graves al cambiar de canción. Nuestro motor DJ Mode analiza los transitorios y los bombos en tiempo real, ajustando los BPM y el pitch de forma dinámica. Gracias a su detección de cruce por cero y umbrales adaptativos, sincroniza las pistas al milisegundo para lograr mezclas automáticas impecables.': 'Forget about awkward transitions and bass clashes when changing songs. Our DJ Mode engine analyzes transients and kick drums in real-time, dynamically adjusting BPM and pitch. Thanks to zero-crossing detection and adaptive thresholds, it synchronizes tracks to the millisecond for flawless automatic mixes.',
  '>Análisis de Transitorios<': '>Transient Analysis<',
  '>Ajuste de BPM<': '>BPM Adjustment<',
  '>Cruce por Cero<': '>Zero-Crossing<',
  '>Mezcla Automática<': '>Automix<',
  'Rendimiento y Eficiencia Nativa': 'Native Performance and Efficiency',
  'A diferencia de alternativas pesadas basadas en C++, Qt5 o Electron, NauticPlayer está construido desde cero sobre el avanzado AVAudioEngine de Apple. El resultado? Un rendimiento ultrarrápido, un uso de CPU casi nulo y una eficiencia energética insuperable.': "Unlike heavy alternatives based on C++, Qt5, or Electron, NauticPlayer is built from the ground up on Apple's advanced AVAudioEngine. The result? Lightning-fast performance, near-zero CPU usage, and unsurpassed energy efficiency.",
  'Además, gracias a su profunda integración con el sistema, puedes visualizar la forma de onda de la pista actual y controlar el reproductor directamente desde la <strong>barra de estado de macOS</strong>, sin necesidad de abrir la ventana principal.': "Furthermore, thanks to its deep system integration, you can visualize the current track's waveform and control the player directly from the <strong>macOS menu bar</strong>, without needing to open the main window.",
  '>Uso de CPU<': '>CPU Usage<',
  '>Batería<': '>Battery Life<',
  '>Forma de onda en menú<': '>Menu Bar Waveform<',
  'Audio Bit-Perfect': 'Bit-Perfect Audio',
  'Tu música merece ser escuchada exactamente como fue grabada. Por eso ofrecemos procesamiento de audio bit-perfect y soporte nativo sin conversiones para formatos de alta fidelidad, incluyendo FLAC, AIFF, MP3 y M4A. Todo esto dentro de un entorno seguro con sandboxing completo.': "Your music deserves to be heard exactly as it was recorded. That's why we offer bit-perfect audio processing and native support without conversions for high-fidelity formats, including FLAC, AIFF, MP3, and M4A. All within a secure environment with complete sandboxing.",
  '>Formatos Lossless<': '>Lossless Formats<',
  '>Sandboxing Seguro<': '>Secure Sandboxing<',
  'Drag & Drop hacia tu DAW': 'Drag & Drop to your DAW',
  '¿Encontraste un sample o una pista que te inspiró? Arrastra la canción desde el reproductor directamente hacia Logic Pro, Ableton, FL Studio y más. Ideal para productores y creadores de contenido.': 'Found an inspiring sample or track? Drag the song from the player directly into Logic Pro, Ableton, FL Studio, and more. Ideal for producers and content creators.',
  'Atajos Rápidos': 'Quick Shortcuts',
  'Mantén el flujo de trabajo sin usar el mouse. Presiona la tecla <kbd': 'Maintain your workflow without using the mouse. Press the <kbd',
  '> para guardar la pista en Favoritos, o utiliza <kbd': '> key to save the track to Favorites, or use <kbd',
  '> para eliminarla o enviarla a la papelera.': '> to delete it or send it to the trash.',
  '>Características<': '>Features<',
  '>Mezcla automática con detección de BPM<': '>Automix with BPM detection<',
  '>Análisis de transitorios en tiempo real<': '>Real-time transient analysis<',
  '>Integración nativa con AVAudioEngine<': '>Native AVAudioEngine integration<',
  '>Soporte para atajos de teclado globales<': '>Global keyboard shortcuts support<',
  '>Notificaciones de reproducción nativas<': '>Native playback notifications<',
  '>Buscador de pistas duplicadas<': '>Duplicate track finder<',
  '>Scrobbling de Last.fm integrado<': '>Integrated Last.fm scrobbling<',
  '>Ventanas de listas de reproducción separadas<': '>Separate playlist windows<',
  '>Búsqueda y reemplazo con expresiones regulares<': '>Regex search and replace<',
  '>Listas de reproducción inteligentes<': '>Smart playlists<',
  '>Estadísticas detalladas de la biblioteca<': '>Detailed library statistics<',
  '>Soporte para control mediante AppleScript<': '>AppleScript control support<',
  '>Reproducción de Audio<': '>Audio Playback<',
  '>Soporte para FLAC, MP3, AIFF y M4A.<': '>Support for FLAC, MP3, AIFF, and M4A<',
  '>Reproducción sin pausas (Gapless playback)<': '>Gapless playback<',
  '>Procesamiento de audio a 64-bit<': '>64-bit audio processing<',
  '>Soporte para dispositivos de audio externos<': '>External audio device support<',
  '>Modo exclusivo (Hog mode) para DACs<': '>Exclusive mode (Hog mode) for DACs<',
  '>Detección de clipping (Clipping detection)<': '>Clipping detection<',
  '>ReplayGain para normalización de volumen<': '>ReplayGain volume normalization<',
  '>Conversión de frecuencia de muestreo de alta calidad<': '>High-quality sample rate conversion<',
  '>Caché de audio en memoria RAM<': '>In-RAM audio caching<',
  '>Listado para macOS 10.15+<': '>Ready for macOS 10.15+<',
  'Creado con precisión para audiófilos y DJs.': 'Crafted with precision for audiophiles and DJs.',
  '>Política de Privacidad<': '>Privacy Policy<',
  '>Términos de Servicio<': '>Terms of Service<',
  '>Contacto<': '>Contact<'
};

for (const [es, en] of Object.entries(translations)) {
  code = code.replace(es, en);
}

fs.writeFileSync('src/App.tsx', code);
console.log("Translations applied successfully.");
