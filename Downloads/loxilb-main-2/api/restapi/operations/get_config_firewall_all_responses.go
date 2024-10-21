// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"github.com/loxilb-io/loxilb/api/models"
)

// GetConfigFirewallAllOKCode is the HTTP code returned for type GetConfigFirewallAllOK
const GetConfigFirewallAllOKCode int = 200

/*
GetConfigFirewallAllOK OK

swagger:response getConfigFirewallAllOK
*/
type GetConfigFirewallAllOK struct {

	/*
	  In: Body
	*/
	Payload *GetConfigFirewallAllOKBody `json:"body,omitempty"`
}

// NewGetConfigFirewallAllOK creates GetConfigFirewallAllOK with default headers values
func NewGetConfigFirewallAllOK() *GetConfigFirewallAllOK {

	return &GetConfigFirewallAllOK{}
}

// WithPayload adds the payload to the get config firewall all o k response
func (o *GetConfigFirewallAllOK) WithPayload(payload *GetConfigFirewallAllOKBody) *GetConfigFirewallAllOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get config firewall all o k response
func (o *GetConfigFirewallAllOK) SetPayload(payload *GetConfigFirewallAllOKBody) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetConfigFirewallAllOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetConfigFirewallAllUnauthorizedCode is the HTTP code returned for type GetConfigFirewallAllUnauthorized
const GetConfigFirewallAllUnauthorizedCode int = 401

/*
GetConfigFirewallAllUnauthorized Invalid authentication credentials

swagger:response getConfigFirewallAllUnauthorized
*/
type GetConfigFirewallAllUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetConfigFirewallAllUnauthorized creates GetConfigFirewallAllUnauthorized with default headers values
func NewGetConfigFirewallAllUnauthorized() *GetConfigFirewallAllUnauthorized {

	return &GetConfigFirewallAllUnauthorized{}
}

// WithPayload adds the payload to the get config firewall all unauthorized response
func (o *GetConfigFirewallAllUnauthorized) WithPayload(payload *models.Error) *GetConfigFirewallAllUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get config firewall all unauthorized response
func (o *GetConfigFirewallAllUnauthorized) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetConfigFirewallAllUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetConfigFirewallAllInternalServerErrorCode is the HTTP code returned for type GetConfigFirewallAllInternalServerError
const GetConfigFirewallAllInternalServerErrorCode int = 500

/*
GetConfigFirewallAllInternalServerError Internal service error

swagger:response getConfigFirewallAllInternalServerError
*/
type GetConfigFirewallAllInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetConfigFirewallAllInternalServerError creates GetConfigFirewallAllInternalServerError with default headers values
func NewGetConfigFirewallAllInternalServerError() *GetConfigFirewallAllInternalServerError {

	return &GetConfigFirewallAllInternalServerError{}
}

// WithPayload adds the payload to the get config firewall all internal server error response
func (o *GetConfigFirewallAllInternalServerError) WithPayload(payload *models.Error) *GetConfigFirewallAllInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get config firewall all internal server error response
func (o *GetConfigFirewallAllInternalServerError) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetConfigFirewallAllInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetConfigFirewallAllServiceUnavailableCode is the HTTP code returned for type GetConfigFirewallAllServiceUnavailable
const GetConfigFirewallAllServiceUnavailableCode int = 503

/*
GetConfigFirewallAllServiceUnavailable Maintanence mode

swagger:response getConfigFirewallAllServiceUnavailable
*/
type GetConfigFirewallAllServiceUnavailable struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetConfigFirewallAllServiceUnavailable creates GetConfigFirewallAllServiceUnavailable with default headers values
func NewGetConfigFirewallAllServiceUnavailable() *GetConfigFirewallAllServiceUnavailable {

	return &GetConfigFirewallAllServiceUnavailable{}
}

// WithPayload adds the payload to the get config firewall all service unavailable response
func (o *GetConfigFirewallAllServiceUnavailable) WithPayload(payload *models.Error) *GetConfigFirewallAllServiceUnavailable {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get config firewall all service unavailable response
func (o *GetConfigFirewallAllServiceUnavailable) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetConfigFirewallAllServiceUnavailable) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(503)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
