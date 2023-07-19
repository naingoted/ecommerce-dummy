import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
	const tag = request.nextUrl.searchParams.get('tag');

	if (!tag) {
		return NextResponse.json({
			revalidated: false,
			msg: 'you need to provide query param ?tag={cache-tag}',
		});
	}
	revalidateTag(tag);
	console.log(`cache invalidated for tag ${tag} at ${Date.now()}`);
	return NextResponse.json({ revalidated: true, now: Date.now() });
}
