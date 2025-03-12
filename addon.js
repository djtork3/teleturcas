import pkg from 'stremio-addon-sdk';
import parseTorrent from 'parse-torrent';

const { addonBuilder, serveHTTP } = pkg;

// 📌 Base de datos de torrents (Serie: Una Nueva Vida, Temporada 1)
const torrents = [
    {
        id: 'una-nueva-vida:1:26',
        title: 'Una Nueva Vida - Temporada 1 Episodio 26',
        season: 1,
        episode: 26,
        magnet: 'magnet:?xt=urn:btih:7c5c6b1ebc256cf3f28a29cda488a3ba173651d1&dn=Una%20nueva%20vida%20%5BHDTV%5D%5BCap.126%5D&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.theoks.net%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dump.cl%3A6969%2Fannounce&tr=udp%3A%2F%2Fns-1.x-fins.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fdiscord.heihachi.pw%3A6969%2Fannounce&tr=http%3A%2F%2Fwww.torrentsnipe.info%3A2701%2Fannounce&tr=http%3A%2F%2Fwww.genesis-sp.org%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.vanitycore.co%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.lintk.me%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.ipv6tracker.org%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.dmcomic.org%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.bt-hash.com%3A80%2Fannounce&tr=http%3A%2F%2Ft.jaekr.sh%3A6969%2Fannounce&tr=http%3A%2F%2Fhome.yxgz.club%3A6969%2Fannounce&tr=https%3A%2F%2Ftracker.bt4g.com%3A443%2Fannounce',
        poster: 'https://media.themoviedb.org/t/p/w227_and_h127_bestv2/eoaVuUygFctizRDJezJz3d6mNyP.jpg', // URL de portada alternativa (reemplaza con una válida)
        description: 'Episodio 26 de la temporada 1 de "Una Nueva Vida".',
        released: '2025-03-09' // Fecha basada en la captura
    },
    {
        id: 'una-nueva-vida:1:27',
        title: 'Una Nueva Vida - Temporada 1 Episodio 27',
        season: 1,
        episode: 27,
        magnet: 'magnet:?xt=urn:btih:6001a932ab1f5c0123b7bf231fb50333ad1b08eb&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=http%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.bittor.pw%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker-udp.gbitt.info%3A80%2Fannounce&tr=udp%3A%2F%2Fretracker01-msk-virt.corbina.net%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.io%3A6969%2Fannounce&tr=udp%3A%2F%2Fns-1.x-fins.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fleet-tracker.moe%3A1337%2Fannounce&tr=udp%3A%2F%2Fisk.richardsw.club%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=http%3A%2F%2Fwww.torrentsnipe.info%3A2701%2Fannounce&tr=http%3A%2F%2Ftracker810.xyz%3A11450%2Fannounce&tr=http%3A%2F%2Ftracker.xiaoduola.xyz%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.vanitycore.co%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.moxing.party%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.lintk.me%3A2710%2Fannounce&tr=https%3A%2F%2Ftracker.bt4g.com%3A443%2Fannounce',
        poster: 'https://media.themoviedb.org/t/p/w227_and_h127_bestv2/aOvQsM2hy3FKXEQfqUqDQbzQekh.jpg', // URL de portada alternativa (reemplaza con una válida)
        description: 'Episodio 27 de la temporada 1 de "Una Nueva Vida".',
        released: '2023-03-16' // Fecha basada en la captura
    }
    // Agrega más episodios aquí con sus portadas y fechas
];

// 📌 Configuración del addon
const builder = new addonBuilder({
    id: 'org.telenovelasturcas',
    version: '2.0.0',
    name: 'Telenovelas Turcas',
    description: 'Disfruta de tus telenovelas turcas favoritas',
    catalogs: [
        {
            type: 'series',
            id: 'telenovelas-turcas-catalog',
            name: 'Telenovelas Turcas',
            extra: [{ name: 'search', isRequired: false }]
        }
    ],
    resources: ['stream', 'meta', 'catalog'],
    types: ['series'],
    idPrefixes: ['una-nueva-vida']
});

// 📌 Manejador de metadatos
builder.defineMetaHandler((args) => {
    console.log('Meta handler args:', args);

    // Si Stremio solicita metadatos para la serie en general (ID: una-nueva-vida)
    if (args.id === 'una-nueva-vida') {
        const videos = torrents.map(t => ({
            id: t.id,
            season: t.season,
            episode: t.episode,
            title: t.title,
            poster: t.poster, // Portada específica del episodio
            released: t.released // Fecha de estreno específica
        }));

        return Promise.resolve({
            meta: {
                id: 'una-nueva-vida',
                type: 'series',
                name: 'Una Nueva Vida',
                poster: 'https://pics.filmaffinity.com/Una_nueva_vida_Serie_de_TV-535836774-large.jpg',
                description: 'Una Nueva Vida sigue la historia de una joven enfrentándose a los retos del amor y la familia.',
                genres: ['Drama', 'Romance'],
                released: '2023-01-01',
                background: 'https://pics.filmaffinity.com/Una_nueva_vida_Serie_de_TV-535836774-large.jpg',
                logo: 'https://pics.filmaffinity.com/Una_nueva_vida_Serie_de_TV-535836774-large.jpg',
                videos: videos
            }
        });
    }

    // Si Stremio solicita metadatos para un episodio específico
    const torrent = torrents.find(t => t.id === args.id);
    if (!torrent) {
        console.log('❌ No se encontró metadatos para:', args.id);
        return Promise.resolve({ meta: null });
    }

    return Promise.resolve({
        meta: {
            id: torrent.id,
            type: 'series',
            name: 'Una Nueva Vida',
            poster: torrent.poster, // Portada específica del episodio
            description: torrent.description,
            season: torrent.season,
            episode: torrent.episode,
            genres: ['Drama', 'Romance'],
            released: torrent.released, // Fecha de estreno específica
            background: torrent.poster,
            logo: torrent.poster
        }
    });
});

// 📌 Manejador de streams con WebTorrent
builder.defineStreamHandler(async (args) => {
    console.log('Stream handler args:', args);
    const torrent = torrents.find(t => t.id === args.id);
    
    if (!torrent) {
        console.log('❌ No se encontró un torrent para:', args.id);
        return Promise.resolve({ streams: [] });
    }

    console.log('✅ Torrent encontrado:', torrent);

    let infoHash;
    try {
        const parsed = await parseTorrent(torrent.magnet);
        infoHash = parsed.infoHash;
        console.log('🔍 InfoHash extraído:', infoHash);
    } catch (error) {
        console.log('❌ Error al parsear torrent:', error);
        infoHash = torrent.magnet.match(/btih:([a-fA-F0-9]+)/)?.[1];
        console.log('⚠️ Usando regex para infoHash:', infoHash);
    }

    if (!infoHash) {
        console.log('❌ No se pudo obtener el infoHash');
        return Promise.resolve({ streams: [] });
    }

    const streams = [{
        title: torrent.title,
        infoHash: infoHash,
        behaviorHints: { bingeGroup: 'una-nueva-vida' }
    }];

    console.log('📡 Streams enviados a Stremio:', streams);

    return Promise.resolve({ streams });
});

// 📌 Manejador de catálogo
builder.defineCatalogHandler((args) => {
    console.log('Catalog handler args:', args);
    if (args.type === 'series' && args.id === 'telenovelas-turcas-catalog') {
        const metas = [{
            id: 'una-nueva-vida',
            type: 'series',
            name: 'Una Nueva Vida',
            poster: 'https://pics.filmaffinity.com/Una_nueva_vida_Serie_de_TV-535836774-large.jpg',
            description: 'Una Nueva Vida sigue la historia de una joven enfrentándose a los retos del amor y la familia.',
            genres: ['Drama', 'Romance'],
            released: '2023-01-01'
        }];

        console.log('📋 Catalog returning:', metas); 

        return Promise.resolve({ metas });
    }
    return Promise.resolve({ metas: [] });
});

// 📌 Iniciar el servidor HTTP
serveHTTP(builder.getInterface(), { port: process.env.PORT || 5000 });

console.log('📡 Addon funcionando en: http://127.0.0.1:5000/manifest.json');