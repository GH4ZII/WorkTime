import { Server } from 'socket.io';
export declare class RealtimeService {
    private server;
    attachServer(server: Server): void;
    emitShiftCreated(shift: any, userIds?: string[]): void;
    emitShiftUpdated(shift: any, userIds?: string[]): void;
    emitShiftDeleted(shiftId: string, userIds?: string[]): void;
    emitTimeOffCreated(req: any, userIds?: string[]): void;
    emitTimeOffUpdated(req: any, userIds?: string[]): void;
    emitTimeOffDeleted(reqId: string, userIds?: string[]): void;
    emitSwapCreated(req: any, userIds?: string[]): void;
    emitSwapUpdated(req: any, userIds?: string[]): void;
    emitSwapDeleted(reqId: string, userIds?: string[]): void;
    private emitToUsers;
}
