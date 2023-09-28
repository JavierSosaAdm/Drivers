export const validates = async (form, errors, setErrors) => {
    
    const nacionalidades = /^(?:Afganistán|Albania|Alemania|Andorra|Angola|Antigua y Barbuda|Argentina|Armenia|Australia|Austria|Azerbaiyán|Bahamas|Baréin|Bangladés|Barbados|Bielorrusia|Bélgica|Belice|Benín|Bután|Bolivia|Bosnia y Herzegovina|Botsuana|Brasil|Brunéi|Bulgaria|Burkina Faso|Burundi|Cabo Verde|Camboya|Camerún|Canadá|Catar|Chad|Chile|China|Chipre|Ciudad del Vaticano|Colombia|Comoras|Corea del Norte|Corea del Sur|Costa de Marfil|Costa Rica|Croacia|Cuba|Dinamarca|Dominica|Ecuador|Egipto|El Salvador|Emiratos Árabes Unidos|Eritrea|Eslovaquia|Eslovenia|España|Estados Unidos|Estonia|Eswatini|Etiopía|Fiyi|Filipinas|Finlandia|Francia|Gabón|Gambia|Georgia|Ghana|Granada|Grecia|Guatemala|Guinea|Guinea-Bisáu|Guinea Ecuatorial|Guyana|Haití|Honduras|Hungría|India|Indonesia|Irak|Irán|Irlanda|Islandia|Islas Marshall|Islas Salomón|Israel|Italia|Jamaica|Japón|Jordania|Kazajistán|Kenia|Kirguistán|Kiribati|Kuwait|Laos|Lesoto|Letonia|Líbano|Liberia|Libia|Liechtenstein|Lituania|Luxemburgo|Madagascar|Malaui|Malasia|Maldivas|Mali|Malta|Marruecos|Mauricio|Mauritania|México|Micronesia|Moldavia|Mónaco|Mongolia|Montenegro|Mozambique|Namibia|Nauru|Nepal|Nicaragua|Níger|Nigeria|Noruega|Nueva Zelanda|Omán|Países Bajos|Pakistán|Palaos|Panamá|Papúa Nueva Guinea|Paraguay|Perú|Polonia|Portugal|Reino Unido|República Centroafricana|República Checa|República del Congo|República Democrática del Congo|República Dominicana|Ruanda|Rumanía|Rusia|Samoa|San Cristóbal y Nieves|San Marino|Santa Lucía|Santa Vicente y las Granadinas|Santa Sede|Santo Tomé y Príncipe|Senegal|Serbia|Seychelles|Sierra Leona|Singapur|Siria|Somalia|Sri Lanka|Sudáfrica|Sudán|Sudán del Sur|Suecia|Suiza|Surinam|Tailandia|Tanzania|Tayikistán|Timor Oriental|Togo|Tonga|Trinidad y Tobago|Túnez|Turkmenistán|Turquía|Tuvalu|Ucrania|Uganda|Uruguay|Uzbekistán|Vanuatu|Venezuela|Vietnam|Yemen|Yibuti|Zambia|Zimbabue)+$/ ;

    if (form.name) {
        if (/^[A-Z][a-z]*(?:\s[A-Z][a-z]*)*$/.test(form.name)) {
            setErrors(prev =>({...prev, name: ''}))
        } else {
            setErrors(prev => ({...prev, name: '*Nombre inválido'}))
        }
    }; 

    if (form.lastName) {
        if (/^[A-Z][a-z]*(?:\s[A-Z][a-z]*)*$/.test(form.lastName)) {
            setErrors(prev =>({...prev, lastName: ''}))
        } else {
            setErrors(prev => ({...prev, name: '*Apellido inválido'}))
        };
    };

    if (form.description) {
        if (/^[a-zA-Z0-9\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/.test(form.description)) {
            setErrors(prev =>({...prev, description: ''}))
        } else {
            setErrors(prev => ({...prev, name: '*Debe agregar una descripción del piloto'}))
        };
    };

    if (form.image) {
        if (/\.(jpg|jpeg|png|gif|bmp)$/i.test(form.image)) {
            setErrors(prev => ({...prev, image: ''}))
        } else {
            setErrors(prev => ({...prev, image: '*Debe agregar una imagen'}))
        };
    };

    if (form.nationality) {
        if (nacionalidades.test(form.nationality)) {
            setErrors(prev => ({...prev, nationality: ''}))
        } else {
            setErrors(prev => ({...prev, nationality: '*Debe agregar la nacionalidad del corredor'}))
        };
    };

    if (form.birthdate) {
        if (/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(form.birthdate)) {
            setErrors(prev => ({...prev, birthdate: ''}))
        } else {
            setErrors(prev => ({...prev, birthdate: '*debe agregar fecha de nacimiento '}))
        };
    };

    if (form.teams) {
        if (/^[a-zA-Z0-9\s]+$/.test(form.teams)) {
            setErrors(prev => ({...prev, teams: ''}))
        } else {
            setErrors(prev => ({...prev, teams: '*Debe elegir al menos una Escudería'}))
        };
    };
};