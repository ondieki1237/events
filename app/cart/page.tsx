"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus, MessageCircle, Send } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"
import { motion } from "framer-motion"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()

  const handleRequestInvoice = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add some products first!")
      return
    }

    // Generate WhatsApp message
    let message = "Hello! I would like to request an invoice for the following items:\n\n"
    
    cart.forEach((item, index) => {
      const price = item.reduced_price || item.price
      message += `${index + 1}. ${item.name}\n`
      message += `   Brand: ${item.brand}\n`
      message += `   Quantity: ${item.quantity}\n`
      message += `   Price: KES ${Number.parseFloat(price).toLocaleString()} each\n`
      message += `   Subtotal: KES ${(Number.parseFloat(price) * item.quantity).toLocaleString()}\n\n`
    })
    
    message += `Total: KES ${getCartTotal().toLocaleString()}\n\n`
    message += "Please send me an invoice for this order. Thank you!"

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/254729115000?text=${encodedMessage}`
    
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Navbar />

      <section className="max-w-7xl w-full mx-auto px-4 md:px-8 py-16 flex-grow">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cart.length === 0 ? "Your cart is empty" : `${cart.length} item${cart.length > 1 ? "s" : ""} in your cart`}
          </p>
        </div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="text-center py-20">
              <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
              <Link href="/offers">
                <Button className="bg-gradient-to-r from-[#0096d9] to-blue-700 text-white">
                  View Black November Offers <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => {
                const price = item.reduced_price || item.price
                const subtotal = Number.parseFloat(price) * item.quantity
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 sm:p-6 hover:shadow-lg transition-all">
                      <div className="flex gap-4 sm:gap-6">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                        />
                        <div className="flex-grow">
                          <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{item.brand}</p>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus size={14} />
                              </Button>
                              <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus size={14} />
                              </Button>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-4">
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Subtotal</p>
                                <p className="text-lg font-bold text-[#0096d9]">
                                  KES {subtotal.toLocaleString()}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-600 hover:bg-red-50 hover:text-red-700"
                              >
                                <Trash2 size={18} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}

              <Button
                variant="outline"
                onClick={clearCart}
                className="w-full text-red-600 border-red-300 hover:bg-red-50"
              >
                <Trash2 size={16} className="mr-2" />
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-4"
              >
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                      <span>KES {getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-[#0096d9]">KES {getCartTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleRequestInvoice}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all text-base py-6 font-bold"
                    >
                      <MessageCircle size={20} className="mr-2" />
                      Request Invoice via WhatsApp
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-2 border-[#0096d9] text-[#0096d9] hover:bg-blue-50"
                      asChild
                    >
                      <Link href="/offers">
                        <ShoppingBag size={18} className="mr-2" />
                        Continue Shopping
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700 flex items-start gap-2">
                      <Send size={16} className="mt-0.5 text-[#0096d9] flex-shrink-0" />
                      <span>
                        Clicking "Request Invoice" will open WhatsApp with your cart details pre-filled. 
                        Our team will respond with an invoice shortly.
                      </span>
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
