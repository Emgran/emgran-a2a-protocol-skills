/**
 * Emgran A2A Protocol Types
 * 
 * Standard message format for inter-agent communication
 */

// ============================================
// A2A Message Envelope
// ============================================

export interface A2AEnvelope {
  /** A2A protocol version */
  acp_version: string;
  /** Unique message identifier */
  message_id: string;
  /** Message timestamp (ISO 8601) */
  timestamp: string;
  
  /** Sender information */
  sender: A2AParticipant;
  /** Recipient information */
  recipient: A2AParticipant;
  
  /** Message type */
  message_type: A2AMessageType;
  /** Correlation ID for request-response linking */
  correlation_id?: string;
  /** Message priority (0=normal, 1=high, 2=urgent) */
  priority?: number;
  /** Time-to-live in seconds */
  ttl?: number;
  
  /** Message payload */
  payload: A2APayload;
  /** Cryptographic signature */
  signature?: A2ASignature;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

// ============================================
// Participant
// ============================================

export interface A2AParticipant {
  /** Decentralized Identifier (DID) */
  did: string;
  /** Agent ID */
  agent_id: string;
  /** Agent endpoint URL */
  endpoint: string;
}

// ============================================
// Message Types
// ============================================

export type A2AMessageType =
  // Task messages
  | 'task.request'
  | 'task.response'
  | 'task.progress'
  | 'task.deliverable'
  // Negotiation messages
  | 'negotiation.offer'
  | 'negotiation.counter'
  | 'negotiation.accept'
  // Capability messages
  | 'capability.query'
  | 'capability.response'
  // System messages
  | 'system.heartbeat'
  | 'system.error'
  | 'system.ack';

// ============================================
// Payload Types
// ============================================

export type A2APayload =
  | TaskRequestPayload
  | TaskResponsePayload
  | TaskProgressPayload
  | TaskDeliverablePayload
  | NegotiationOfferPayload
  | NegotiationCounterPayload
  | NegotiationAcceptPayload
  | CapabilityQueryPayload
  | CapabilityResponsePayload
  | SystemHeartbeatPayload
  | SystemErrorPayload
  | SystemAckPayload;

// Task Payloads
export interface TaskRequestPayload {
  type: 'task.request';
  task_id: string;
  description: string;
  requirements?: Record<string, unknown>;
}

export interface TaskResponsePayload {
  type: 'task.response';
  task_id: string;
  accepted: boolean;
  reason?: string;
}

export interface TaskProgressPayload {
  type: 'task.progress';
  task_id: string;
  progress: number;
  status: string;
}

export interface TaskDeliverablePayload {
  type: 'task.deliverable';
  task_id: string;
  deliverable: Record<string, unknown>;
}

// Negotiation Payloads
export interface NegotiationOfferPayload {
  type: 'negotiation.offer';
  terms: Record<string, unknown>;
}

export interface NegotiationCounterPayload {
  type: 'negotiation.counter';
  terms: Record<string, unknown>;
}

export interface NegotiationAcceptPayload {
  type: 'negotiation.accept';
  terms: Record<string, unknown>;
}

// Capability Payloads
export interface CapabilityQueryPayload {
  type: 'capability.query';
  capabilities?: string[];
}

export interface CapabilityResponsePayload {
  type: 'capability.response';
  capabilities: string[];
}

// System Payloads
export interface SystemHeartbeatPayload {
  type: 'system.heartbeat';
  status: 'alive';
}

export interface SystemErrorPayload {
  type: 'system.error';
  error: string;
  code: number;
}

export interface SystemAckPayload {
  type: 'system.ack';
  message_id: string;
}

// ============================================
// Signature
// ============================================

export interface A2ASignature {
  algorithm: string;
  value: string;
  public_key?: string;
}

// ============================================
// Connection
// ============================================

export interface A2AConnection {
  id: string;
  local_agent: A2AParticipant;
  remote_agent: A2AParticipant;
  status: 'pending' | 'active' | 'closed';
  created_at: string;
  last_activity: string;
}

// ============================================
// Discovery
// ============================================

export interface A2ADiscoveryResult {
  agent_id: string;
  did: string;
  endpoint: string;
  capabilities: string[];
  trust_score?: number;
}
