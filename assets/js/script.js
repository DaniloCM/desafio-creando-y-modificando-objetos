// Inicio Clase Consultorio
function Consultorio(nombre, paciente) {

    var _nombre = nombre;
    var _paciente = paciente || [];

    Object.defineProperties(this, {

        //Getters
        "_getNombre": {
            get: function () {
                return _nombre;
            }
        },

        "_getPaciente": {
            get: function () {
                return _paciente;
            }
        },

        //Setters
        "_setNombre": {
            set: function (nombre) {
                _nombre = nombre;
            }
        },

        "_setPaciente": {
            set: function (paciente) {
                _paciente = paciente;
            }
        }
    });
}

//----------------------Getters Consultorio----------------------

// Getter del atributo nombre
Consultorio.prototype.getNombre = function () {
    return this._getNombre;
};

// Metodo para mostrar todos los pacientes y getter del atributo paciente
Consultorio.prototype.getPaciente = function () {
    return this._getPaciente;
};

//----------------------Setters Consultorio----------------------

Consultorio.prototype.setNombre = function (nombre) {
    this._setNombre = nombre;
};

Consultorio.prototype.setPaciente = function (paciente) {
    this._setPaciente = paciente;
};

//----------------------Metodos Consultorio----------------------

// Metodo para buscar un paciente por su nombre
Consultorio.prototype.buscarPaciente = function (nombrePaciente) {

    // Expresión Regular para coincidencias con el nombre que se busca, sin sensibilidad de mayuscula ni de posición
    var nombreRegex = new RegExp(`${nombrePaciente}`, "i");

    return this.getPaciente().filter(function (elem) {
        return nombreRegex.test(elem.getNombre());
    });

};

// Metodo para agregar un paciente
Consultorio.prototype.agregarPaciente = function (paciente) {

    this.getPaciente().push(paciente);

};
// Fin Clase Consultorio



// Inicio Clase Paciente
function Paciente(nombre, edad, rut, diagnostico) {

    var _nombre = nombre;
    var _edad = edad;
    var _rut = rut;
    var _diagnostico = diagnostico;

    Object.defineProperties(this, {

        //Getters
        "_getNombre": {
            get: function () {
                return _nombre;
            }
        },

        "_getEdad": {
            get: function () {
                return _edad;
            }
        },

        "_getRut": {
            get: function () {
                return _rut;
            }
        },

        "_getDiagnostico": {
            get: function () {
                return _diagnostico;
            }
        },

        //Setters
        "_setNombre": {
            set: function (paciente) {
                _paciente = paciente;
            }
        },

        "_setEdad": {
            set: function (edad) {
                _edad = edad;
            }
        },

        "_setRut": {
            set: function (rut) {
                _rut = rut;
            }
        },

        "_setDiagnostico": {
            set: function (diagnostico) {
                _diagnostico = diagnostico;
            }
        },
    });
}

//----------------------Getters Paciente----------------------
Paciente.prototype.getNombre = function () {
    return this._getNombre;
};

Paciente.prototype.getEdad = function () {
    return this._getEdad;
};

Paciente.prototype.getRut = function () {
    return this._getRut;
};

Paciente.prototype.getDiagnostico = function () {
    return this._getDiagnostico;
};

//----------------------Setters Paciente----------------------
Paciente.prototype.setNombre = function (nombre) {
    this._setNombre = nombre;
};

Paciente.prototype.setEdad = function (edad) {
    this._setEdad = edad;
};

Paciente.prototype.setRut = function (rut) {
    this._setRut = rut;
};

Paciente.prototype.setDiagnostico = function (diagnostico) {
    this._setDiagnostico = diagnostico;
};
// Fin Clase Paciente



//----------------------Funciones----------------------

// Funcion para agregar los consultorios agregados como opciones en el formulario de agragar pacientes
var agregarOpcionConsultorio = function (listaConsultorios) {

    //Limpiar opciones
    $("#select-consultorio").html(`<option selected>Abre las opciones de consultorios</option>`);

    listaConsultorios.forEach(function (elem, index) {

        $("#select-consultorio").append(`
        
            <option value="${index + 1}">${elem.getNombre()}</option>
        
        `);
    });

};


// Agrega los consultorios en la seccion "Pacientes por consultorio" en forma de acordión
var agregarAcordionConsultorio = function (listaConsultorios) {

    $("#acordionConsultorios").html(""); //Limpiar acordion

    listaConsultorios.forEach(function (consultorio, index) {

        $("#acordionConsultorios").append(`
            <div class="accordion-item border-dark">
                <h2 class="accordion-header" id="acordion-${index}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#acordion-colapso-${index}" aria-expanded="false" aria-controls="acordion-colapso-${index}">
                        ${consultorio.getNombre()}
                    </button>
                </h2>
                <div id="acordion-colapso-${index}" class="accordion-collapse collapse" aria-labelledby="acordion-${index}">
                    <div class="accordion-body">
    
                        <!-- Tabla -->
                        <div class="table-responsive">
    
                            <table id="tabla-consultorio-${index}" class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Edad</th>
                                        <th>Rut</th>
                                        <th>Diagnostico</th>
                                    </tr>
                                </thead>
    
                                <tbody>
    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
};


// Agrega los pacientes en la seccion "Pacientes por consultorio" en su respectivo consultorio donde se atendio
var agregarPacientesAcordion = function (listaConsultorio) {

    listaConsultorio.forEach(function (consultorio, indexConsultorio) {

        if (consultorio.getPaciente().length > 0) {

            var tablaConsultorio = $(`#tabla-consultorio-${indexConsultorio} tbody`);

            tablaConsultorio.html(""); //limpiar pacientes

            consultorio.getPaciente().forEach(function (paciente, indexPaciente) {

                tablaConsultorio.append(`
    
                    <tr>
                        <td>${indexPaciente}</td>
                        <td>${paciente.getNombre()}</td>
                        <td>${paciente.getEdad()}</td>
                        <td>${paciente.getRut()}</td>
                        <td>${paciente.getDiagnostico()}</td>
                    </tr>    
                `);
            });
        }
    });
};


// Valida que se ha seleccionado un consultorio donde se a atendido el paciente a agregar
var validacionSeleccionConsultorio = function (indexConsultorio) {

    // Remueve las clases de validación del input
    $("#select-consultorio").removeClass("is-invalid");


    if (isNaN(indexConsultorio)) {

        // Se esconde la información del heroe y le agrega al input la clase no validado
        $("#select-consultorio").addClass("is-invalid");
        return false;
    } else {

        return true;
    }
};


// Valida que todo los valores de los input no sean vacios en un formulario 
var validacionFormulario = function (idFormulario) {

    var selectorFormulario = $(`#${idFormulario} input`);
    var todoValido = true;

    for (const elem of selectorFormulario) {

        var selectorInput = $(`#${elem.id}`);

        selectorInput.removeClass("is-invalid");

        if (selectorInput.val() == "") {

            selectorInput.addClass("is-invalid");
            todoValido = false;
        }
    }

    return todoValido;
};



//Funcion Ready
$(function () {

    // Array con todos los consultorios creados
    var listaConsultorios = [];

    //Inicio ingreso de pacientes y consultorios predeterminados 
    // Se instancia los pacientes
    let pac1 = new Paciente("Danilo", 27, "1-1", "Sueño");
    let pac2 = new Paciente("Danilo Franco", 16, "1-2", "Pereza");

    // Se instancia el consultorio
    let consultorio1 = new Consultorio("Yobilo", [pac1, pac2]);

    // Se agrega al array "consultorioEncontrados" donde estan todos los consultorios
    listaConsultorios.push(consultorio1);

    // Se agregan todos los consultorios como opciónes en el formulario de agregar pacientes
    agregarOpcionConsultorio(listaConsultorios);
    // Se agrega el consultorio al acordion con los consultorios y sus pacientes
    agregarAcordionConsultorio(listaConsultorios);
    // Se agregan los pacientes en los respectivos consultorios en el acordión
    agregarPacientesAcordion(listaConsultorios);
    //Fin ingreso de pacientes y consultorios predeterminados


    // Formulario Consultorio
    $("#form-consultorio").submit(function (e) {
        e.preventDefault();

        // Se valida que el formulario no tenga inputs vacios
        var validarFormularioConsultorio = validacionFormulario("form-consultorio");

        // Si se falla la validación no se agrega el consultorio
        if (validarFormularioConsultorio) {
            var nombre = $("#txt-nombre-consultorio").val();

            // Se instancia el consultorio a agregar
            var consultorio = new Consultorio(nombre);

            // Se agrega al array "consultorioEncontrados" donde estan todos los consultorios
            listaConsultorios.push(consultorio);

            // Se agregan todos los consultorios como opciónes en el formulario de agregar pacientes
            agregarOpcionConsultorio(listaConsultorios);
            // Se agrega el consultorio al acordion con los consultorios y sus pacientes
            agregarAcordionConsultorio(listaConsultorios);
            // Se agregan los pacientes en los respectivos consultorios en el acordión
            agregarPacientesAcordion(listaConsultorios);

            $("form")[0].reset();
        }
    });


    // Formulario Paciente
    $("#form-paciente").submit(function (e) {
        e.preventDefault();

        // Si se envia con la opcion de muestra "Abre las opciones de consultorios" el valor es NaN
        var indexConsultorio = $("#select-consultorio").val() - 1;

        // Valida que se ha seleccionado un consultorio
        var validarOpcionConsultorio = validacionSeleccionConsultorio(indexConsultorio);

        // Valida que no existan input vacios
        var validarFormularioPaciente = validacionFormulario("form-paciente");

        // Si alguno de las validaciones es falsa, no se envian los datos del paciente
        if (validarOpcionConsultorio && validarFormularioPaciente) {

            var nombre = $("#txt-nombre-paciente").val();
            var edad = $("#txt-edad-paciente").val();
            var rut = $("#txt-rut-paciente").val();
            var diagnostico = $("#txt-diagnostico-paciente").val();

            var paciente = new Paciente(nombre, edad, rut, diagnostico);

            listaConsultorios[indexConsultorio].agregarPaciente(paciente);

    

            $("#tabla-1 table tbody").html('');
            listaConsultorios[indexConsultorio].getPaciente().forEach((item, index) => {
                $("#tabla-1 table tbody").append(`
                    <tr>
                        <td>${index+1}</td>
                        <td>${item.getNombre()}</td>
                        <td>${item.getEdad()}</td>
                        <td>${item.getRut()}</td>
                        <td>${item.getDiagnostico()}</td>
                    </tr>
                `);
            });

            agregarPacientesAcordion(listaConsultorios);

            $("form")[1].reset();
        }
    });


    // Formulario Busqueda
    $("#form-busqueda").submit(function (e) {
        e.preventDefault();

        // Valida que la búsqueda no sea vacía
        var validarFormularioBusqueda = validacionFormulario("form-busqueda");

        // Si no es exitosa la validación, no se realiza la busqueda
        if (validarFormularioBusqueda) {

            var busqueda = $("#txt-busqueda").val();
            // Array donde se guardaran los pacientes que coincidan con el nombre
            var encontrados = [];
            // Array donde se guardan donde se atendieron los pacientes coincidentes
            var consultorioEncontrados = [];
            // Array con los pacientes encontrado en un consultorio en particular
            var encontradosEsteConsultorio;

            listaConsultorios.forEach(function (consultorio) {

                encontradosEsteConsultorio = consultorio.buscarPaciente(busqueda);

                encontrados = encontrados.concat(encontradosEsteConsultorio);

                // Agrega el nombre del consultorio a "consultorioEncontrados" la cantidad de pacientes encontrados en esta. Por ejemplo, se encontraron 2 "Danilo" en el consultorio "Yobilo", entonces se agregan dos veces yobilo en el array "consultorioEncontrados"
                for (let i = 0; i < encontradosEsteConsultorio.length; i++) {
                    consultorioEncontrados.push(consultorio.getNombre());
                }

            });

            // Se limpia la tabla con los pacientes encontrados
            $("#tabla-busqueda table tbody").html('');

            // Se agregan los pacientes encontrados en la tabla
            encontrados.forEach((item, index) => {
                $("#tabla-busqueda table tbody").append(`
                    <tr>
                        <td>${consultorioEncontrados[index]}</td>
                        <td>${item.getNombre()}</td>
                        <td>${item.getEdad()}</td>
                        <td>${item.getRut()}</td>
                        <td>${item.getDiagnostico()}</td>
                    </tr>
                `);
            });

            // Se muestra la tabla una vez rellenado la tabla con los pacientes encontrados
            $("#tabla-busqueda").removeClass("d-none");
        }
    });
});