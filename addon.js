import pkg from 'stremio-addon-sdk';
import parseTorrent from 'parse-torrent';

const { addonBuilder, serveHTTP } = pkg;

// 📌 Base de datos de series
const seriesData = [
    {
        id: 'una-nueva-vida',
        name: 'Una Nueva Vida',
        poster: 'https://via.placeholder.com/300x400.jpg?text=Una+Nueva+Vida',
        description: 'Una Nueva Vida sigue la historia de una joven enfrentándose a los retos del amor y la familia.',
        genres: ['Drama', 'Romance'],
        released: '2023-01-01',
        cast: ['Actor 1', 'Actor 2'],
        director: 'Director Name',
        runtime: '45 min',
        rating: '8.5',
        trailer: 'https://www.youtube.com/watch?v=example',
        episodes: [
            {
                id: 'una-nueva-vida:1:26',
                title: 'Una Nueva Vida - Temporada 1 Episodio 26',
                season: 1,
                episode: 26,
                magnet: 'magnet:?xt=urn:btih:7c5c6b1ebc256cf3f28a29cda488a3ba173651d1&dn=Una%20nueva%20vida%20%5BHDTV%5D%5BCap.126%5D&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.theoks.net%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dump.cl%3A6969%2Fannounce&tr=udp%3A%2F%2Fns-1.x-fins.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fdiscord.heihachi.pw%3A6969%2Fannounce&tr=http%3A%2F%2Fwww.torrentsnipe.info%3A2701%2Fannounce&tr=http%3A%2F%2Fwww.genesis-sp.org%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.vanitycore.co%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.lintk.me%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.ipv6tracker.org%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.dmcomic.org%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.bt-hash.com%3A80%2Fannounce&tr=http%3A%2F%2Ft.jaekr.sh%3A6969%2Fannounce&tr=http%3A%2F%2Fhome.yxgz.club%3A6969%2Fannounce&tr=https%3A%2F%2Ftracker.bt4g.com%3A443%2Fannounce',
                poster: 'https://via.placeholder.com/300x400.jpg?text=Episodio+26',
                description: 'Episodio 26 de la temporada 1 de "Una Nueva Vida".',
                released: '2025-03-09'
            },
            {
                id: 'una-nueva-vida:1:27',
                title: 'Una Nueva Vida - Temporada 1 Episodio 27',
                season: 1,
                episode: 27,
                magnet: 'magnet:?xt=urn:btih:6001a932ab1f5c0123b7bf231fb50333ad1b08eb&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=http%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.bittor.pw%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker-udp.gbitt.info%3A80%2Fannounce&tr=udp%3A%2F%2Fretracker01-msk-virt.corbina.net%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.io%3A6969%2Fannounce&tr=udp%3A%2F%2Fns-1.x-fins.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fleet-tracker.moe%3A1337%2Fannounce&tr=udp%3A%2F%2Fisk.richardsw.club%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=http%3A%2F%2Fwww.torrentsnipe.info%3A2701%2Fannounce&tr=http%3A%2F%2Ftracker810.xyz%3A11450%2Fannounce&tr=http%3A%2F%2Ftracker.xiaoduola.xyz%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.vanitycore.co%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.moxing.party%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.lintk.me%3A2710%2Fannounce&tr=https%3A%2F%2Ftracker.bt4g.com%3A443%2Fannounce',
                poster: 'https://via.placeholder.com/300x400.jpg?text=Episodio+27',
                description: 'Episodio 27 de la temporada 1 de "Una Nueva Vida".',
                released: '2023-03-16'
            }
        ]
    }
    // Agrega más series aquí
];

// 📌 Configuración del addon
const builder = new addonBuilder({
    id: 'org.telenovelasturcas',
    version: '1.0.4',
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

    // Buscar la serie
    const series = seriesData.find(s => s.id === args.id);
    if (series) {
        const videos = series.episodes.map(ep => ({
            id: ep.id,
            season: ep.season,
            episode: ep.episode,
            title: ep.title,
            poster: ep.poster,
            released: ep.released
        }));

        return Promise.resolve({
            meta: {
                id: series.id,
                type: 'series',
                name: series.name,
                poster: series.poster,
                description: series.description,
                genres: series.genres,
                released: series.released,
                cast: series.cast,
                director: series.director,
                runtime: series.runtime,
                rating: series.rating,
                trailer: series.trailer,
                background: series.poster,
                logo: series.poster,
                videos: videos
            }
        });
    }

    // Buscar un episodio específico
    const episode = seriesData.flatMap(s => s.episodes).find(ep => ep.id === args.id);
    if (!episode) {
        console.log('❌ No se encontró metadatos para:', args.id);
        return Promise.resolve({ meta: null });
    }

    return Promise.resolve({
        meta: {
            id: episode.id,
            type: 'series',
            name: 'Una Nueva Vida',
            poster: episode.poster,
            description: episode.description,
            season: episode.season,
            episode: episode.episode,
            genres: ['Drama', 'Romance'],
            released: episode.released,
            background: episode.poster,
            logo: episode.poster
        }
    });
});

// 📌 Manejador de streams con WebTorrent
builder.defineStreamHandler(async (args) => {
    console.log('Stream handler args:', args);
    const episode = seriesData.flatMap(s => s.episodes).find(ep => ep.id === args.id);
    
    if (!episode) {
        console.log('❌ No se encontró un torrent para:', args.id);
        return Promise.resolve({ streams: [] });
    }

    console.log('✅ Torrent encontrado:', episode);

    let infoHash;
    try {
        const parsed = await parseTorrent(episode.magnet);
        infoHash = parsed.infoHash;
        console.log('🔍 InfoHash extraído:', infoHash);
    } catch (error) {
        console.log('❌ Error al parsear torrent:', error);
        infoHash = episode.magnet.match(/btih:([a-fA-F0-9]+)/)?.[1];
        console.log('⚠️ Usando regex para infoHash:', infoHash);
    }

    if (!infoHash) {
        console.log('❌ No se pudo obtener el infoHash');
        return Promise.resolve({ streams: [] });
    }

    const streams = [{
        title: episode.title,
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
        const metas = seriesData.map(series => ({
            id: series.id,
            type: 'series',
            name: series.name,
            poster: series.poster,
            description: series.description,
            genres: series.genres,
            released: series.released
        }));

        console.log('📋 Catalog returning:', metas); 

        return Promise.resolve({ metas });
    }
    return Promise.resolve({ metas: [] });
});

// 📌 Iniciar el servidor HTTP
serveHTTP(builder.getInterface(), { port: process.env.PORT || 7000 });

console.log('📡 Addon funcionando en: http://127.0.0.1:7000/manifest.json');