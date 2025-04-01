export enum CommandType {
  MOVEMENT = 'MOVEMENT',
  SENSOR = 'SENSOR',
  SYSTEM = 'SYSTEM',
  EMERGENCY = 'EMERGENCY',
  SECURITY = 'SECURITY'
}

export enum CommandPriority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
  CRITICAL = 3
}

export enum CommandStatus {
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED',
  EXECUTING = 'EXECUTING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REJECTED = 'REJECTED'
}

export interface CommandSource {
  id: string;
  type: 'USER' | 'SYSTEM' | 'AUTOMATION';
  role: string;
  ipAddress: string;
}

export interface CommandParameters {
  [key: string]: any;
}

export interface DroneCommand {
  commandId: string;
  type: CommandType;
  parameters: CommandParameters;
  signature: string;
  timestamp: number;
  priority: CommandPriority;
  source: CommandSource;
  status: CommandStatus;
  targetDroneId: string;
}

export interface CommandValidationResult {
  isValid: boolean;
  errors: string[];
  threatScore: number;
} 