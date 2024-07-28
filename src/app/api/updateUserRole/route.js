import prisma from '@/utils/connection';

export const POST = async (req, res) => {
  try {
    const { userId, newRole } = await req.json();

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole, },
    });

    if (user) {
      return new Response(JSON.stringify({ message: 'Role updated successfully' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Failed to update role' }), { status: 500 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update role' }), { status: 500 });
  }
};
