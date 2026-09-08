// ====================================================================
// GeoFS Profesyonel & Akıcı İngilizce Kaptan Anons Paketi
// ====================================================================

(function() {
    // ----------------------------------------------------------------
    // 1. DOĞAL İNGİLİZCE ERKEK SESİ MOTORU
    // ----------------------------------------------------------------
    function akiciAnonsCal(metin) {
        window.speechSynthesis.cancel();
        kabinChimePlay();

        setTimeout(function() {
            var sesler = window.speechSynthesis.getVoices();
            var sesEn = new SpeechSynthesisUtterance(metin);
            
            // Aksansız, düzgün konuşan yerel erkek seslerini önceliklendir
            var profesyonelErkekSes = sesler.find(s => 
                s.lang.startsWith('en') && 
                (s.name.includes('David') || s.name.includes('Mark') || s.name.includes('Daniel') || s.name.includes('Google US English'))
            ) || sesler.find(s => s.lang.includes('en-US') && s.name.toLowerCase().includes('male')) 
              || sesler.find(s => s.lang.startsWith('en'));

            if (profesyonelErkekSes) sesEn.voice = profesyonelErkekSes;
            
            sesEn.lang = 'en-US';
            sesEn.pitch = 0.90; // Doğal erkek sesi tonu
            sesEn.rate = 0.90;  // Akıcı ve anlaşılır konuşma hızı

            window.speechSynthesis.speak(sesEn);
        }, 1000);
    }

    // Boeing/Airbus Kabin Chime Sesi
    function kabinChimePlay() {
        var chimeAudio = new Audio('https://raw.githubusercontent.com/xT3m/flight-sim-assets/main/cabin_chime.mp3');
        chimeAudio.volume = 0.5;
        chimeAudio.play().catch(function() {
            try {
                var ctx = new (window.AudioContext || window.webkitAudioContext)();
                var osc1 = ctx.createOscillator(), osc2 = ctx.createOscillator(), gain = ctx.createGain();
                osc1.type = 'sine'; osc2.type = 'sine';
                osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
                osc2.frequency.setValueAtTime(880.00, ctx.currentTime + 0.35);
                gain.gain.setValueAtTime(0.12, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
                osc1.connect(gain); osc2.connect(gain); gain.connect(ctx.destination);
                osc1.start(ctx.currentTime); osc1.stop(ctx.currentTime + 0.35);
                osc2.start(ctx.currentTime + 0.35); osc2.stop(ctx.currentTime + 1.2);
            } catch(e){}
        });
    }

    // ----------------------------------------------------------------
    // 2. PROFESYONEL AKICI METİNLER (1-5 Tuşları)
    // ----------------------------------------------------------------
    var anonslar = {
        'Digit1': {
            baslik: "Captain: Welcome & Taxi",
            en: "Good day, ladies and gentlemen. This is your captain speaking. Welcome aboard. We have completed our pre-flight checks and we are ready for pushback. Please make sure your seatbelts are securely fastened."
        },
        'Digit2': {
            baslik: "Captain: Departure",
            en: "Cabin crew, please be seated for departure. We are cleared for takeoff."
        },
        'Digit3': {
            baslik: "Captain: Cruise Altitude",
            en: "Ladies and gentlemen, we have reached our cruising altitude. Weather ahead looks clear, so I have switched off the seatbelt sign. Relax and enjoy the flight."
        },
        'Digit4': {
            baslik: "Captain: Top of Descent",
            en: "Ladies and gentlemen, we have initiated our descent into our destination. Cabin crew, please prepare the cabin for arrival."
        },
        'Digit5': {
            baslik: "Captain: Arrival",
            en: "Welcome to our destination. Please remain seated with your seatbelts fastened until the aircraft comes to a complete stop at the gate and the seatbelt sign is turned off. Thank you for flying with us."
        }
    };

    document.addEventListener('keydown', function(event) {
        if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

        if (anonslar[event.code]) {
            var item = anonslar[event.code];
            if (window.geofs && geofs.fx && geofs.fx.flashMessage) {
                geofs.fx.flashMessage("📢 " + item.baslik);
            }
            akiciAnonsCal(item.en);
        }
    });

    console.log("✈️ GeoFS Profesyonel İngilizce Kaptan Anons Sistemi Aktif!");
})();
