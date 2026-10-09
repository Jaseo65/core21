import heroStudioImg from '../assets/images/hero_home_fitness_1791559168318.jpg';
import plankCoreImg from '../assets/images/exercise_plank_core_1791559183391.jpg';
import kettlebellSquatImg from '../assets/images/exercise_kettlebell_squat_1791559197242.jpg';
import lungeMobilityImg from '../assets/images/exercise_lunge_mobility_1791559208526.jpg';
import pushupTempoImg from '../assets/images/exercise_pushup_tempo_1791559219775.jpg';

export type MuscleZone = 'core' | 'lower' | 'upper_push' | 'mobility' | 'full_body';

export interface ExerciseItem {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  zone: MuscleZone;
  zoneLabel: string;
  durationSec: number;
  restSec: number;
  repsOrTime: string;
  sets: number;
  tempo: string;
  equipment: string;
  imageUrl: string;
  primaryMuscles: string[];
  stabilizerMuscles: string[];
  cues: string[];
  breathingCue: string;
}

export interface DayProgram {
  day: number;
  title: string;
  focusTag: string;
  durationMin: number;
  calories: number;
  intensity: 'Moderada' | 'Alta Precisión' | 'Recuperación Activa' | 'Umbral Metabólico';
  summary: string;
  exerciseIds: string[];
}

export interface EquipmentOption {
  id: string;
  label: string;
  detail: string;
  enabledByDefault: boolean;
}

export interface SessionHistoryEntry {
  id: string;
  dayNumber: number;
  dateLabel: string;
  sessionTitle: string;
  durationMin: number;
  kcal: number;
  rpe: number;
  completedSets: number;
  totalSets: number;
}

export const HERO_STUDIO_IMAGE = heroStudioImg;

export const EXERCISES_CATALOG: ExerciseItem[] = [
  {
    id: 'ex-plank-hollow',
    index: '01',
    name: 'Plancha RKC de Tensión Total',
    subtitle: 'Isometría anti-extensión lumbar y co-contracción abdominal',
    zone: 'core',
    zoneLabel: 'Core y Estabilidad',
    durationSec: 45,
    restSec: 20,
    repsOrTime: '45 seg',
    sets: 3,
    tempo: 'Isométrico',
    equipment: 'Esterilla',
    imageUrl: plankCoreImg,
    primaryMuscles: ['Recto Abdominal', 'Transverso Profundo', 'Oblicuos Internos'],
    stabilizerMuscles: ['Serrato Anterior', 'Glúteo Mayor', 'Cuádriceps'],
    cues: [
      'Alinea codos directamente bajo los hombros formando un ángulo de 90 grados.',
      'Tracciona isométricamente los antebrazos hacia las puntas de los pies sin moverlos.',
      'Mantén retroversión pélvica sutil activando glúteos al 80% de tensión.'
    ],
    breathingCue: 'Inhala nasal 3s expandiendo costillas laterales · Exhala labial forzado 4s'
  },
  {
    id: 'ex-goblet-squat',
    index: '02',
    name: 'Sentadilla Goblet con Pausa Basal',
    subtitle: 'Dominancia de rodilla con control torácico vertical',
    zone: 'lower',
    zoneLabel: 'Tren Inferior',
    durationSec: 50,
    restSec: 25,
    repsOrTime: '12 reps',
    sets: 4,
    tempo: '3-2-1-0',
    equipment: 'Kettlebell 16 kg',
    imageUrl: kettlebellSquatImg,
    primaryMuscles: ['Cuádriceps Vasto Medial', 'Glúteo Mayor'],
    stabilizerMuscles: ['Erectores Espinales', 'Core Anterior', 'Aductores'],
    cues: [
      'Sujeta la pesa por los cuernos pegada al esternón con codos apuntando hacia abajo.',
      'Desciende en 3 segundos exactos manteniendo toda la planta del pie anclada.',
      'Sostén 2 segundos en el punto más bajo sin perder tensión lumbar antes de subir.'
    ],
    breathingCue: 'Inhala profundo antes de descender · Exhala al superar el ángulo de 90 grados'
  },
  {
    id: 'ex-split-lunge',
    index: '03',
    name: 'Zancada Funcional de Control Excéntrico',
    subtitle: 'Estabilidad unilateral de cadera y disociación lumbopélvica',
    zone: 'mobility',
    zoneLabel: 'Movilidad y Cadera',
    durationSec: 45,
    restSec: 20,
    repsOrTime: '10 reps / lado',
    sets: 3,
    tempo: '3-1-1-1',
    equipment: 'Peso Corporal',
    imageUrl: lungeMobilityImg,
    primaryMuscles: ['Glúteo Medio', 'Cuádriceps', 'Isquiosurales'],
    stabilizerMuscles: ['Psoas Ilíaco', ' Estabilizadores de Tobillo', 'Oblicuos'],
    cues: [
      'Da un paso atrás al ancho de las caderas para preservar la base de sustentación.',
      'Permite una ligera inclinación tibia-torso paralela para reclutar la cadena posterior.',
      'Empuja el suelo verticalmente con el talón delantero hasta la extensión completa.'
    ],
    breathingCue: 'Inhala durante los 3s de descenso · Exhala con firmeza en el impulso concéntrico'
  },
  {
    id: 'ex-tempo-pushup',
    index: '04',
    name: 'Flexión Escapular en Tempo Estricto',
    subtitle: 'Empuje horizontal con control de protracción y depresión',
    zone: 'upper_push',
    zoneLabel: 'Empuje y Tracción',
    durationSec: 40,
    restSec: 25,
    repsOrTime: '10 reps',
    sets: 3,
    tempo: '3-1-1-0',
    equipment: 'Esterilla',
    imageUrl: pushupTempoImg,
    primaryMuscles: ['Pectoral Mayor', 'Tríceps Braquial', 'Deltoides Anterior'],
    stabilizerMuscles: ['Serrato Anterior', 'Recto Abdominal', 'Glúteos'],
    cues: [
      'Rota externamente las palmas contra el suelo manteniendo codos a 45 grados del torso.',
      'Desciende en bloque rígido desde los tobillos hasta la coronilla durante 3 segundos.',
      'Finaliza la subida empujando el suelo para activar el serrato anterior.'
    ],
    breathingCue: 'Inhala controlando la bajada · Exhala de forma continua al extender los brazos'
  },
  {
    id: 'ex-deadbug-press',
    index: '05',
    name: 'Dead Bug Contralateral de Precisión',
    subtitle: 'Disociación de extremidades con columna lumbar neutra',
    zone: 'core',
    zoneLabel: 'Core y Estabilidad',
    durationSec: 45,
    restSec: 15,
    repsOrTime: '12 alternas',
    sets: 3,
    tempo: '2-2-2-0',
    equipment: 'Esterilla',
    imageUrl: plankCoreImg,
    primaryMuscles: ['Transverso Abdominal', 'Oblicuo Externo', 'Flexores de Cadera'],
    stabilizerMuscles: ['Diafragma', 'Suelo Pélvico', 'Dorsal Ancho'],
    cues: [
      'Sella la zona lumbar contra la esterilla antes de iniciar cualquier movimiento.',
      'Extiende brazo y pierna opuestos lentamente hasta rozar a 5 cm del suelo.',
      'Pausa 2 segundos en máxima palanca exhalando todo el aire residual.'
    ],
    breathingCue: 'Exhala durante toda la fase de extensión · Inhala al retornar al centro'
  },
  {
    id: 'ex-kb-hinge',
    index: '06',
    name: 'Bisagra de Cadera RDL con Kettlebell',
    subtitle: 'Activación de cadena posterior e isquiosurales en elongación',
    zone: 'full_body',
    zoneLabel: 'Tren Inferior',
    durationSec: 50,
    restSec: 25,
    repsOrTime: '12 reps',
    sets: 4,
    tempo: '3-1-1-1',
    equipment: 'Kettlebell 16 kg',
    imageUrl: kettlebellSquatImg,
    primaryMuscles: ['Isquiosurales', 'Glúteo Mayor', 'Erectores Torácicos'],
    stabilizerMuscles: ['Dorsal Ancho', 'Trapecio Medio', 'Agarre Antebrazo'],
    cues: [
      'Desplaza la cadera horizontalmente hacia la pared trasera manteniendo tibias verticales.',
      'Empaqueta las escápulas hacia los bolsillos traseros evitando que la carga se separe.',
      'Extiende la cadera con potencia controlada hasta quedar erguido sin hiperextender.'
    ],
    breathingCue: 'Inhala profundo al proyectar la cadera atrás · Exhala al cerrar la bisagra'
  }
];

export const TWENTY_ONE_DAY_MATRIX: DayProgram[] = [
  {
    day: 1,
    title: 'Calibración Postural y Base de Core',
    focusTag: 'Estabilidad Base',
    durationMin: 22,
    calories: 210,
    intensity: 'Moderada',
    summary: 'Evaluación motora inicial centrada en alineación lumbopélvica, respiración costal y activación isométrica.',
    exerciseIds: ['ex-plank-hollow', 'ex-deadbug-press', 'ex-split-lunge']
  },
  {
    day: 2,
    title: 'Fuerza Estructural de Tren Inferior',
    focusTag: 'Fuerza Funcional',
    durationMin: 28,
    calories: 295,
    intensity: 'Alta Precisión',
    summary: 'Desarrollo de control excéntrico en sentadilla profunda y estabilidad de cadera con carga moderada.',
    exerciseIds: ['ex-goblet-squat', 'ex-split-lunge', 'ex-kb-hinge', 'ex-plank-hollow']
  },
  {
    day: 3,
    title: 'Empuje Escapular y Cadena Anterior',
    focusTag: 'Control Torácico',
    durationMin: 25,
    calories: 260,
    intensity: 'Moderada',
    summary: 'Trabajo en tempo estricto 3-1-1-0 para optimizar la salud del hombro y la transferencia de fuerza por el tronco.',
    exerciseIds: ['ex-tempo-pushup', 'ex-plank-hollow', 'ex-deadbug-press']
  },
  {
    day: 4,
    title: 'Movilidad Articular y Flujo Cinético',
    focusTag: 'Movilidad Activa',
    durationMin: 20,
    calories: 175,
    intensity: 'Recuperación Activa',
    summary: 'Descompresión espinal, apertura de flexores de cadera y control motor en rangos de movimiento finales.',
    exerciseIds: ['ex-split-lunge', 'ex-deadbug-press', 'ex-plank-hollow']
  },
  {
    day: 5,
    title: 'Capacidad de Trabajo y Cadena Posterior',
    focusTag: 'Potencia Controlada',
    durationMin: 30,
    calories: 330,
    intensity: 'Umbral Metabólico',
    summary: 'Integración de bisagra de cadera y sentadilla en bloques densos con descansos medidos.',
    exerciseIds: ['ex-kb-hinge', 'ex-goblet-squat', 'ex-tempo-pushup', 'ex-plank-hollow']
  },
  {
    day: 6,
    title: 'Simetría Unilateral y Equilibrio',
    focusTag: 'Estabilidad Unilateral',
    durationMin: 26,
    calories: 270,
    intensity: 'Alta Precisión',
    summary: 'Corrección de asimetrías entre hemisferios mediante trabajo monopodal y anti-rotación.',
    exerciseIds: ['ex-split-lunge', 'ex-deadbug-press', 'ex-goblet-squat']
  },
  {
    day: 7,
    title: 'Restauración Neuromuscular y Respiración',
    focusTag: 'Recuperación',
    durationMin: 18,
    calories: 145,
    intensity: 'Recuperación Activa',
    summary: 'Sesión ligera de consolidación semanal enfocada en oxigenación tisular y tono parasimpático.',
    exerciseIds: ['ex-deadbug-press', 'ex-split-lunge']
  },
  {
    day: 8,
    title: 'Progresión Bajo Tensión: Fase II',
    focusTag: 'Tiempo Bajo Tensión',
    durationMin: 28,
    calories: 305,
    intensity: 'Alta Precisión',
    summary: 'Incremento del tiempo en fase excéntrica y pausas isométricas para mayor reclutamiento fibrilar.',
    exerciseIds: ['ex-goblet-squat', 'ex-tempo-pushup', 'ex-plank-hollow', 'ex-kb-hinge']
  },
  {
    day: 9,
    title: 'Estabilidad Dinámica de Cadera y Core',
    focusTag: 'Core Endurance',
    durationMin: 26,
    calories: 280,
    intensity: 'Moderada',
    summary: 'Transferencia de energía entre extremidades manteniendo rigidez en el cilindro abdominal.',
    exerciseIds: ['ex-plank-hollow', 'ex-split-lunge', 'ex-deadbug-press', 'ex-kb-hinge']
  },
  {
    day: 10,
    title: 'Densidad Funcional de Cuerpo Completo',
    focusTag: 'Cuerpo Completo',
    durationMin: 32,
    calories: 355,
    intensity: 'Umbral Metabólico',
    summary: 'Combinación de patrones de empuje, tracción de cadera y rodilla con transiciones de 20 segundos.',
    exerciseIds: ['ex-goblet-squat', 'ex-tempo-pushup', 'ex-kb-hinge', 'ex-split-lunge']
  },
  {
    day: 11,
    title: 'Desbloqueo Torácico y Control Escapular',
    focusTag: 'Movilidad Técnica',
    durationMin: 22,
    calories: 215,
    intensity: 'Recuperación Activa',
    summary: 'Preparación articular profunda previa al bloque central de resistencia isométrica.',
    exerciseIds: ['ex-tempo-pushup', 'ex-deadbug-press', 'ex-split-lunge']
  },
  {
    day: 12,
    title: 'Resistencia de Core y Estabilidad Cinética',
    focusTag: 'Core Endurance',
    durationMin: 28,
    calories: 340,
    intensity: 'Alta Precisión',
    summary: 'Protocolo central del Día 12: combina tensión isométrica RKC con patrones compuestos de pierna y empuje controlado.',
    exerciseIds: ['ex-plank-hollow', 'ex-goblet-squat', 'ex-split-lunge', 'ex-tempo-pushup']
  },
  {
    day: 13,
    title: 'Fuerza Excéntrica de Cadena Posterior',
    focusTag: 'Fuerza Posterior',
    durationMin: 30,
    calories: 325,
    intensity: 'Alta Precisión',
    summary: 'Énfasis en bisagra de cadera pesada y control de desaceleración en zancada.',
    exerciseIds: ['ex-kb-hinge', 'ex-split-lunge', 'ex-goblet-squat', 'ex-deadbug-press']
  },
  {
    day: 14,
    title: 'Descarga Activa de Mitad de Ciclo',
    focusTag: 'Restauración',
    durationMin: 20,
    calories: 165,
    intensity: 'Recuperación Activa',
    summary: 'Cierre de la segunda semana con enfoque en movilidad de tobillo, cadera y control diafragmático.',
    exerciseIds: ['ex-deadbug-press', 'ex-split-lunge', 'ex-plank-hollow']
  },
  {
    day: 15,
    title: 'Potencia Metabólica e Integración',
    focusTag: 'Acondicionamiento',
    durationMin: 34,
    calories: 380,
    intensity: 'Umbral Metabólico',
    summary: 'Inicio de la semana pico: intervalos de alta densidad técnica manteniendo precisión postural.',
    exerciseIds: ['ex-goblet-squat', 'ex-kb-hinge', 'ex-tempo-pushup', 'ex-plank-hollow']
  },
  {
    day: 16,
    title: 'Resistencia Muscular de Tren Superior',
    focusTag: 'Empuje Técnico',
    durationMin: 28,
    calories: 290,
    intensity: 'Alta Precisión',
    summary: 'Volumen acumulado en empuje horizontal y estabilización anti-rotacional.',
    exerciseIds: ['ex-tempo-pushup', 'ex-plank-hollow', 'ex-deadbug-press', 'ex-split-lunge']
  },
  {
    day: 17,
    title: 'Dominio Unilateral y Propiocepción',
    focusTag: 'Control Motor',
    durationMin: 27,
    calories: 285,
    intensity: 'Moderada',
    summary: 'Trabajo pausado en apoyos asimétricos para blindar rodillas y caderas.',
    exerciseIds: ['ex-split-lunge', 'ex-goblet-squat', 'ex-deadbug-press']
  },
  {
    day: 18,
    title: 'Umbral de Fuerza-Resistencia',
    focusTag: 'Fuerza Total',
    durationMin: 35,
    calories: 395,
    intensity: 'Umbral Metabólico',
    summary: 'Sesión de mayor volumen del programa combinando los 6 patrones fundamentales.',
    exerciseIds: ['ex-goblet-squat', 'ex-kb-hinge', 'ex-tempo-pushup', 'ex-split-lunge', 'ex-plank-hollow']
  },
  {
    day: 19,
    title: 'Flujo Articular y Descompresión',
    focusTag: 'Movilidad',
    durationMin: 22,
    calories: 190,
    intensity: 'Recuperación Activa',
    summary: 'Asimilación fisiológica previa a las dos sesiones finales de evaluación.',
    exerciseIds: ['ex-deadbug-press', 'ex-split-lunge', 'ex-plank-hollow']
  },
  {
    day: 20,
    title: 'Síntesis Atlética de Precisión',
    focusTag: 'Rendimiento',
    durationMin: 32,
    calories: 360,
    intensity: 'Alta Precisión',
    summary: 'Ejecución fluida con descansos mínimos y máxima calidad técnica en cada repetición.',
    exerciseIds: ['ex-plank-hollow', 'ex-goblet-squat', 'ex-kb-hinge', 'ex-tempo-pushup']
  },
  {
    day: 21,
    title: 'Test de Consolidación 21 Días',
    focusTag: 'Culminación',
    durationMin: 36,
    calories: 410,
    intensity: 'Umbral Metabólico',
    summary: 'Evaluación integral del ciclo de 21 días midiendo control postural, capacidad aeróbica y estabilidad.',
    exerciseIds: ['ex-plank-hollow', 'ex-goblet-squat', 'ex-split-lunge', 'ex-tempo-pushup', 'ex-kb-hinge']
  }
];

export const INITIAL_EQUIPMENT: EquipmentOption[] = [
  {
    id: 'eq-mat',
    label: 'Esterilla Técnica Antideslizante',
    detail: 'Superficie de alta densidad para trabajo isométrico y suelo',
    enabledByDefault: true
  },
  {
    id: 'eq-kb',
    label: 'Kettlebell de Hierro Fundido (12–20 kg)',
    detail: 'Para sentadilla Goblet, bisagra RDL y carga axial',
    enabledByDefault: true
  },
  {
    id: 'eq-db',
    label: 'Par de Mancuernas Hexagonales',
    detail: 'Sustituto o complemento bilateral para zancadas y empuje',
    enabledByDefault: true
  },
  {
    id: 'eq-bands',
    label: 'Bandas de Resistencia Progresiva',
    detail: 'Tensión variable para activación escapular y glúteo medio',
    enabledByDefault: false
  },
  {
    id: 'eq-bench',
    label: 'Banco Bajo o Cajón de Apoyo',
    detail: 'Soporte para elevaciones de cadera y split squats búlgaros',
    enabledByDefault: false
  }
];

export const INITIAL_HISTORY: SessionHistoryEntry[] = [
  {
    id: 'hist-11',
    dayNumber: 11,
    dateLabel: 'Ayer · 07:30',
    sessionTitle: 'Desbloqueo Torácico y Control Escapular',
    durationMin: 22,
    kcal: 215,
    rpe: 6,
    completedSets: 9,
    totalSets: 9
  },
  {
    id: 'hist-10',
    dayNumber: 10,
    dateLabel: 'Hace 2 días · 08:00',
    sessionTitle: 'Densidad Funcional de Cuerpo Completo',
    durationMin: 32,
    kcal: 355,
    rpe: 8,
    completedSets: 14,
    totalSets: 14
  },
  {
    id: 'hist-9',
    dayNumber: 9,
    dateLabel: 'Hace 3 días · 07:45',
    sessionTitle: 'Estabilidad Dinámica de Cadera y Core',
    durationMin: 26,
    kcal: 280,
    rpe: 7,
    completedSets: 12,
    totalSets: 12
  },
  {
    id: 'hist-8',
    dayNumber: 8,
    dateLabel: 'Hace 4 días · 18:15',
    sessionTitle: 'Progresión Bajo Tensión: Fase II',
    durationMin: 28,
    kcal: 305,
    rpe: 8,
    completedSets: 13,
    totalSets: 13
  }
];
