// src/components/admin/KanbanView.js
import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ExternalLink, Edit } from 'lucide-react';

const KanbanBookingCard = ({ booking, index, onCustomerClick, onAdminNotesClick }) => (
  <Draggable draggableId={booking._id} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`kanban-booking-card ${snapshot.isDragging ? 'is-dragging' : ''}`}
      >
        <strong>{booking.eventName}</strong>
        <p>Customer: <span className="customer-name" onClick={() => onCustomerClick(booking)}>{booking.userName} <ExternalLink size={12} style={{ verticalAlign: 'middle' }} /></span></p>
        <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
        <p>Guests: {booking.guestCount}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px'}}>
            <span className={`status-badge status-${booking.status.toLowerCase()}`}>
            {booking.status}
            </span>
            <button onClick={() => onAdminNotesClick(booking)} title="Add/View Admin Notes" className="action-buttons">
                <Edit size={16} />
            </button>
        </div>
      </div>
    )}
  </Draggable>
);

const KanbanColumn = ({ status, bookings, onCustomerClick, onAdminNotesClick }) => (
  <div className="kanban-column card">
    <h3 className="kanban-column-title">{status} ({bookings.length})</h3>
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="kanban-column-content"
          style={{
            backgroundColor: snapshot.isDraggingOver ? 'var(--hover-bg)' : 'transparent',
            borderRadius: 'inherit',
            transition: 'background-color 0.2s ease',
            padding: '5px', // Padding inside droppable area
          }}
        >
          {bookings.map((booking, index) => (
            <KanbanBookingCard
              key={booking._id}
              booking={booking}
              index={index}
              onCustomerClick={onCustomerClick}
              onAdminNotesClick={onAdminNotesClick}
            />
          ))}
          {provided.placeholder}
          {bookings.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '20px' }}>Drag bookings here or they will appear here if their status is {status}.</p>}
        </div>
      )}
    </Droppable>
  </div>
);

const KanbanView = ({ bookings, onStatusChange, onCustomerClick, onAdminNotesClick }) => {
  const columns = {
    Pending: bookings.filter(b => b.status === 'Pending'),
    Approved: bookings.filter(b => b.status === 'Approved'),
    Rejected: bookings.filter(b => b.status === 'Rejected'),
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    // If dropped in the same column at the same position, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return;
    }

    // If moving within the same column, react-beautiful-dnd handles reordering internally
    // If moving between columns
    if (source.droppableId !== destination.droppableId) {
      onStatusChange(draggableId, destination.droppableId);
    }
  };

  return (
    <div className="kanban-container card">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {Object.keys(columns).map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              bookings={columns[status]}
              onCustomerClick={onCustomerClick}
              onAdminNotesClick={onAdminNotesClick}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanView;