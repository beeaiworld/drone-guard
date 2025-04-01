import { useState, useCallback } from 'react';
import { CommandProcessor } from '@/lib/commands/CommandProcessor';
import { DroneCommand, CommandStatus } from '@/lib/commands/types';

export const useCommandProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastCommandStatus, setLastCommandStatus] = useState<CommandStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processor = CommandProcessor.getInstance();

  const sendCommand = useCallback(async (command: DroneCommand) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const success = await processor.processCommand(command);
      const status = processor.getCommandStatus(command.commandId);
      setLastCommandStatus(status || null);
      
      if (!success) {
        setError('Command processing failed');
      }
      
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const getCommandHistory = useCallback((limit?: number) => {
    return processor.getCommandHistory(limit);
  }, []);

  const getQueueLength = useCallback(() => {
    return processor.getCommandQueueLength();
  }, []);

  return {
    sendCommand,
    isProcessing,
    lastCommandStatus,
    error,
    getCommandHistory,
    getQueueLength
  };
}; 