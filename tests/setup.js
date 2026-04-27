// Polyfill globals that jsdom expects when required from the default node test
// environment. Needed because some jsdom versions reference TextEncoder/Decoder
// at module load time rather than at runtime.
const { TextEncoder, TextDecoder } = require('util');
if (typeof global.TextEncoder === 'undefined') global.TextEncoder = TextEncoder;
if (typeof global.TextDecoder === 'undefined') global.TextDecoder = TextDecoder;
