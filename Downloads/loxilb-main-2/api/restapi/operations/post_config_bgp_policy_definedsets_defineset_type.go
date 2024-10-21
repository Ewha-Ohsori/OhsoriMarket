// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// PostConfigBgpPolicyDefinedsetsDefinesetTypeHandlerFunc turns a function with the right signature into a post config bgp policy definedsets defineset type handler
type PostConfigBgpPolicyDefinedsetsDefinesetTypeHandlerFunc func(PostConfigBgpPolicyDefinedsetsDefinesetTypeParams) middleware.Responder

// Handle executing the request and returning a response
func (fn PostConfigBgpPolicyDefinedsetsDefinesetTypeHandlerFunc) Handle(params PostConfigBgpPolicyDefinedsetsDefinesetTypeParams) middleware.Responder {
	return fn(params)
}

// PostConfigBgpPolicyDefinedsetsDefinesetTypeHandler interface for that can handle valid post config bgp policy definedsets defineset type params
type PostConfigBgpPolicyDefinedsetsDefinesetTypeHandler interface {
	Handle(PostConfigBgpPolicyDefinedsetsDefinesetTypeParams) middleware.Responder
}

// NewPostConfigBgpPolicyDefinedsetsDefinesetType creates a new http.Handler for the post config bgp policy definedsets defineset type operation
func NewPostConfigBgpPolicyDefinedsetsDefinesetType(ctx *middleware.Context, handler PostConfigBgpPolicyDefinedsetsDefinesetTypeHandler) *PostConfigBgpPolicyDefinedsetsDefinesetType {
	return &PostConfigBgpPolicyDefinedsetsDefinesetType{Context: ctx, Handler: handler}
}

/*
	PostConfigBgpPolicyDefinedsetsDefinesetType swagger:route POST /config/bgp/policy/definedsets/{defineset_type} postConfigBgpPolicyDefinedsetsDefinesetType

# Adds a BGP  definedsets for making Policy

Adds a BGP definedsets for making Policy
*/
type PostConfigBgpPolicyDefinedsetsDefinesetType struct {
	Context *middleware.Context
	Handler PostConfigBgpPolicyDefinedsetsDefinesetTypeHandler
}

func (o *PostConfigBgpPolicyDefinedsetsDefinesetType) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewPostConfigBgpPolicyDefinedsetsDefinesetTypeParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}
