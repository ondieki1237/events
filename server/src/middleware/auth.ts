import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  email: string
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' })

  const token = auth.split(' ')[1]
  const secret = process.env.JWT_SECRET || 'change_this_secret'

  try {
    const payload = jwt.verify(token, secret) as JwtPayload
    // optionally attach payload to req
    ;(req as any).user = payload
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
